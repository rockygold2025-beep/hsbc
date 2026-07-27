from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    session,
    jsonify,
    current_app,
)
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from backend.extensions import db
from backend.models import User, PendingApplication, KycDocument, AuditLog
from datetime import datetime
import json
import os
import traceback

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("user.dashboard"))

    if request.method == "POST":
        try:
            form_data = request.form.to_dict()
            # Validate required fields
            required_fields = [
                "title",
                "first_name",
                "last_name",
                "date_of_birth",
                "gender",
                "username",
                "email",
                "phone",
                "country_of_residence",
                "city",
                "county_state",
                "postcode",
                "address",
                "employment_status",
                "profession",
                "annual_income_range",
                "source_of_funds",
                "account_type",
                "preferred_currency",
                "branch_selection",
                "password",
                "confirm_password",
                "transaction_pin",
                "confirm_pin",
                "security_question_1",
                "security_answer_1",
                "security_question_2",
                "security_answer_2",
                "security_question_3",
                "security_answer_3",
                "emergency_name",
                "emergency_relationship",
                "emergency_phone",
                "terms",
                "privacy",
                "data_processing",
            ]

            for field in required_fields:
                if field not in form_data or not form_data[field].strip():
                    return (
                        jsonify(
                            {
                                "success": False,
                                "error": f"Missing required field: {field}",
                            }
                        ),
                        400,
                    )

            # Uniqueness checks
            if User.query.filter_by(username=form_data["username"]).first():
                return (
                    jsonify({"success": False, "error": "Username already taken"}),
                    400,
                )
            if User.query.filter_by(email=form_data["email"]).first():
                return (
                    jsonify({"success": False, "error": "Email already registered"}),
                    400,
                )

            # Password strength
            password = form_data["password"]
            if len(password) < 12:
                return (
                    jsonify(
                        {
                            "success": False,
                            "error": "Password must be at least 12 characters",
                        }
                    ),
                    400,
                )
            if not any(c.isupper() for c in password):
                return (
                    jsonify(
                        {
                            "success": False,
                            "error": "Password must contain an uppercase letter",
                        }
                    ),
                    400,
                )
            if not any(c.islower() for c in password):
                return (
                    jsonify(
                        {
                            "success": False,
                            "error": "Password must contain a lowercase letter",
                        }
                    ),
                    400,
                )
            if not any(c.isdigit() for c in password):
                return (
                    jsonify(
                        {"success": False, "error": "Password must contain a number"}
                    ),
                    400,
                )
            if not any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
                return (
                    jsonify(
                        {
                            "success": False,
                            "error": "Password must contain a special character",
                        }
                    ),
                    400,
                )
            if password != form_data["confirm_password"]:
                return (
                    jsonify({"success": False, "error": "Passwords do not match"}),
                    400,
                )

            # PIN validation
            pin = form_data["transaction_pin"]
            if not pin.isdigit() or len(pin) != 6:
                return (
                    jsonify(
                        {"success": False, "error": "PIN must be exactly 6 digits"}
                    ),
                    400,
                )
            if pin != form_data["confirm_pin"]:
                return jsonify({"success": False, "error": "PINs do not match"}), 400

            # Age check
            dob = datetime.strptime(form_data["date_of_birth"], "%Y-%m-%d")
            age = (datetime.now() - dob).days // 365
            if age < 18:
                return (
                    jsonify(
                        {"success": False, "error": "You must be 18 years or older"}
                    ),
                    400,
                )

            # 🔒 HASH PASSWORD and PIN before storing (CRITICAL)
            form_data["password"] = generate_password_hash(password)
            form_data.pop("confirm_password", None)
            form_data["transaction_pin"] = generate_password_hash(pin)
            form_data.pop("confirm_pin", None)

            # Hash security answers (optional but good)
            for i in range(1, 4):
                ans = form_data.get(f"security_answer_{i}")
                if ans:
                    form_data[f"security_answer_{i}"] = generate_password_hash(ans)

            # Create pending application
            pending_app = PendingApplication(
                form_data=json.dumps(form_data),
                ip_address=request.remote_addr,
                user_agent=request.headers.get("User-Agent"),
            )
            db.session.add(pending_app)
            db.session.commit()

            # Audit log
            audit = AuditLog(
                user_id=None,
                action="registration_submitted",
                details=f"New KYC application: {pending_app.application_ref}",
                ip_address=request.remote_addr,
                user_agent=request.headers.get("User-Agent"),
            )
            db.session.add(audit)
            db.session.commit()

            return jsonify(
                {
                    "success": True,
                    "message": "Application submitted successfully",
                    "ref_number": pending_app.application_ref,
                }
            )

        except Exception as e:
            db.session.rollback()
            print(f"❌ Registration error: {str(e)}")
            traceback.print_exc()
            return jsonify({"success": False, "error": str(e)}), 500

    return render_template("register.html")


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        if current_user.is_admin:
            return redirect(url_for("admin.dashboard"))
        return redirect(url_for("user.dashboard"))

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        remember = request.form.get("remember", False)

        user = User.query.filter(
            (User.username == username) | (User.email == username)
        ).first()
        if not user or not check_password_hash(user.password_hash, password):
            flash("Invalid username/email or password.", "danger")
            return render_template("login.html")
        if not user.is_active:
            flash("Your account has been deactivated.", "danger")
            return render_template("login.html")

        login_user(user, remember=bool(remember))
        user.last_login = datetime.utcnow()
        db.session.commit()
        flash(f"Welcome back, {user.username}!", "success")

        if user.is_admin:
            return redirect(url_for("admin.dashboard"))
        else:
            # If there’s a pending international transfer, redirect to payment page
            # We’ll handle that in the user dashboard route
            return redirect(url_for("user.dashboard"))

    return render_template("login.html")


@auth_bp.route("/logout")
@login_required
def logout():
    session.pop("csrf_token", None)
    session.pop("pending_transfer_id", None)
    session.pop("pending_transfer_codes", None)
    logout_user()
    flash("Logged out successfully.", "info")
    return redirect(url_for("main.index"))
