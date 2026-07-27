from flask import Blueprint, render_template, request, jsonify, flash, redirect, url_for
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from backend.extensions import db
import os
from backend.models import (
    User,
    Transaction,
    PendingApplication,
    KycDocument,
    SecurityQuestion,
    EmergencyContact,
    ApprovalHistory,
    AdminAction,
)
from backend.utils import (
    generate_account_number,
    generate_sort_code,
    generate_customer_id,
)
from datetime import datetime
import json
import random

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")


@admin_bp.route("/")
@login_required
def dashboard():
    if not current_user.is_admin:
        flash("Access denied.", "danger")
        return redirect(url_for("user.dashboard"))

    pending_transactions = (
        Transaction.query.filter_by(status="pending")
        .order_by(Transaction.created_at.desc())
        .limit(10)
        .all()
    )
    pending_applications = (
        PendingApplication.query.filter_by(kyc_status="pending_review")
        .order_by(PendingApplication.submitted_at.desc())
        .limit(10)
        .all()
    )
    total_users = User.query.filter_by(is_admin=False).count()
    active_users = User.query.filter_by(is_admin=False, is_active=True).count()
    total_transactions = Transaction.query.count()
    pending_count = Transaction.query.filter_by(status="pending").count()

    admin_codes = {
        "bvlc": "BVLC7894",
        "tac": "TAC9649",
        "insurance": "INS2136",
        "itac": "ITAC1990",
    }

    return render_template(
        "admin/dashboard.html",
        pending_count=pending_count,
        total_users=total_users,
        total_transactions=total_transactions,
        active_users=active_users,
        pending_transactions=pending_transactions,
        pending_applications=pending_applications,
        admin_codes=admin_codes,
    )


@admin_bp.route("/users")
@login_required
def users():
    if not current_user.is_admin:
        flash("Access denied.", "danger")
        return redirect(url_for("user.dashboard"))
    users = User.query.filter_by(is_admin=False).all()
    return render_template("admin/users.html", users=users)


@admin_bp.route("/transactions")
@login_required
def transactions():
    if not current_user.is_admin:
        flash("Access denied.", "danger")
        return redirect(url_for("user.dashboard"))
    transactions = Transaction.query.order_by(Transaction.created_at.desc()).all()
    return render_template("admin/transactions.html", transactions=transactions)


@admin_bp.route("/kyc")
@login_required
def kyc():
    if not current_user.is_admin:
        flash("Access denied.", "danger")
        return redirect(url_for("user.dashboard"))
    applications = PendingApplication.query.order_by(
        PendingApplication.submitted_at.desc()
    ).all()
    return render_template("admin/kyc.html", applications=applications)


@admin_bp.route("/kyc/<int:app_id>", methods=["GET", "POST"])
@login_required
def kyc_review(app_id):
    if not current_user.is_admin:
        flash("Access denied.", "danger")
        return redirect(url_for("user.dashboard"))

    application = PendingApplication.query.get_or_404(app_id)

    if request.method == "POST":
        action = request.form.get("action")
        notes = request.form.get("notes", "")

        if action == "approve":
            data = json.loads(application.form_data)

            if User.query.filter_by(username=data["username"]).first():
                flash("Username already exists.", "danger")
                return redirect(url_for("admin.kyc"))

            # Create the user
            user = User(
                username=data["username"],
                email=data["email"],
                password_hash=data["password"],  # already hashed
                pin_hash=data["transaction_pin"],  # already hashed
                title=data.get("title"),
                first_name=data.get("first_name"),
                middle_name=data.get("middle_name"),
                last_name=data.get("last_name"),
                date_of_birth=(
                    datetime.strptime(data["date_of_birth"], "%Y-%m-%d")
                    if data.get("date_of_birth")
                    else None
                ),
                gender=data.get("gender"),
                marital_status=data.get("marital_status"),
                nationality=data.get("nationality"),
                phone=data.get("phone"),
                alt_phone=data.get("alt_phone"),
                country_of_residence=data.get("country_of_residence"),
                city=data.get("city"),
                county_state=data.get("county_state"),
                address=data.get("address"),
                postcode=data.get("postcode"),
                employment_status=data.get("employment_status"),
                profession=data.get("profession"),
                employer_name=data.get("employer_name"),
                employer_address=data.get("employer_address"),
                annual_income_range=data.get("annual_income_range"),
                source_of_funds=data.get("source_of_funds"),
                account_type=data.get("account_type"),
                preferred_currency=data.get("preferred_currency", "GBP"),
                is_verified=True,
                is_active=True,
                created_at=datetime.utcnow(),
                approved_at=datetime.utcnow(),
                approved_by=current_user.id,
            )
            user.account_number = generate_account_number()
            user.sort_code = generate_sort_code()
            user.customer_id = generate_customer_id()

            # Handle profile photo – store relative path
            selfie_doc = KycDocument.query.filter_by(
                application_id=application.id, document_type="selfie"
            ).first()
            if selfie_doc and selfie_doc.file_path:
                try:
                    rel_path = os.path.relpath(
                        selfie_doc.file_path, current_app.static_folder
                    )
                    user.profile_photo = rel_path.replace("\\", "/")
                except Exception:
                    user.profile_photo = None

            db.session.add(user)
            db.session.flush()  # ⬅️ This gives user.id immediately

            # Security questions (answers already hashed)
            for i in range(1, 4):
                q = data.get(f"security_question_{i}")
                a = data.get(f"security_answer_{i}")
                if q and a:
                    sq = SecurityQuestion(user_id=user.id, question=q, answer_hash=a)
                    db.session.add(sq)

            # Emergency contact – NOW user.id is available
            ec = EmergencyContact(
                user_id=user.id,  # ⬅️ This is no longer None
                full_name=data.get("emergency_name"),
                relationship=data.get("emergency_relationship"),
                phone=data.get("emergency_phone"),
                email=data.get("emergency_email"),
                address=data.get("emergency_address"),
            )
            db.session.add(ec)

            # Link application to user
            application.user_id = user.id
            application.kyc_status = "approved"
            application.reviewed_by = current_user.id
            application.reviewed_at = datetime.utcnow()

            # Approval history
            ah = ApprovalHistory(
                application_id=application.id,
                admin_id=current_user.id,
                action="approved",
                notes=notes or "Application approved by admin",
            )
            db.session.add(ah)

            db.session.commit()
            flash(
                f"✅ Application {application.application_ref} approved! User {user.username} created.",
                "success",
            )

        elif action == "reject":
            if not notes:
                flash("Please provide a rejection reason.", "danger")
                return redirect(url_for("admin.kyc_review", app_id=app_id))
            application.kyc_status = "rejected"
            application.rejection_reason = notes
            application.reviewed_by = current_user.id
            application.reviewed_at = datetime.utcnow()
            db.session.commit()
            flash(f"❌ Application {application.application_ref} rejected.", "warning")

        elif action == "more_info":
            if not notes:
                flash("Please specify what information is needed.", "danger")
                return redirect(url_for("admin.kyc_review", app_id=app_id))
            application.kyc_status = "requires_more_info"
            application.review_notes = notes
            application.reviewed_by = current_user.id
            application.reviewed_at = datetime.utcnow()
            db.session.commit()
            flash(
                f"📋 Additional information requested for {application.application_ref}.",
                "info",
            )

        return redirect(url_for("admin.kyc"))

    return render_template("admin/kyc_review.html", application=application)
