from flask import Blueprint, request, jsonify, session
from flask_login import login_required, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from backend.extensions import db, csrf
from backend.models import User, Transaction, AdminAction
from datetime import datetime
import traceback

api_bp = Blueprint("api", __name__, url_prefix="/api")


# ---- Balance ----
@api_bp.route("/balance")
@login_required
def get_balance():
    return jsonify({"balance": current_user.balance, "username": current_user.username})


# ---- Create Transaction (Local & International) ----
@api_bp.route("/transaction", methods=["POST"])
@csrf.exempt
@login_required
def create_transaction():
    try:
        if current_user.is_admin:
            return jsonify({"error": "Admin accounts cannot create transactions"}), 403
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request data"}), 400

        # PIN verification
        pin = data.get("pin", "").strip()
        if not pin or len(pin) != 6 or not pin.isdigit():
            return (
                jsonify({"error": "Please enter a valid 6-digit transaction PIN"}),
                400,
            )
        if not current_user.pin_hash:
            return (
                jsonify(
                    {"error": "You do not have a transaction PIN set. Contact support."}
                ),
                400,
            )
        if not check_password_hash(current_user.pin_hash, pin):
            return jsonify({"error": "Invalid transaction PIN. Please try again."}), 401

        transfer_type = data.get("transfer_type", "local")
        amount = data.get("amount")
        description = data.get("description", "").strip()

        if not amount or float(amount) <= 0:
            return jsonify({"error": "Please enter a valid amount greater than 0"}), 400
        amount = float(amount)
        if current_user.balance < amount:
            return (
                jsonify(
                    {
                        "error": f"Insufficient balance. Available: £{current_user.balance:.2f}"
                    }
                ),
                400,
            )

        # ---- LOCAL TRANSFER ----
        if transfer_type == "local":
            receiver_username = data.get("receiver", "").strip()
            if not receiver_username:
                return jsonify({"error": "Please enter a recipient username"}), 400
            receiver = User.query.filter_by(username=receiver_username).first()
            if not receiver:
                return jsonify({"error": f'User "{receiver_username}" not found'}), 404
            if receiver.id == current_user.id:
                return jsonify({"error": "You cannot send money to yourself"}), 400

            transaction = Transaction(
                sender_id=current_user.id,
                receiver_id=receiver.id,
                amount=amount,
                description=description or f"Local transfer to {receiver_username}",
                status="pending",
                transaction_type="local",
                created_at=datetime.utcnow(),
            )
            db.session.add(transaction)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": f"✅ Local transfer of £{amount:.2f} to {receiver_username} created! Waiting for admin approval.",
                        "transaction_id": transaction.id,
                        "amount": amount,
                        "receiver": receiver_username,
                    }
                ),
                201,
            )

        # ---- INTERNATIONAL TRANSFER ----
        elif transfer_type == "international":
            bank_name = data.get("bank_name", "").strip()
            account_holder = data.get("account_holder", "").strip()
            account_number = data.get("account_number", "").strip()
            bank_country = data.get("bank_country", "").strip()
            swift_code = data.get("swift_code", "").strip()

            if not bank_name:
                return jsonify({"error": "Please enter the bank name"}), 400
            if not account_holder:
                return jsonify({"error": "Please enter the account holder name"}), 400
            if not account_number:
                return jsonify({"error": "Please enter the account number"}), 400
            if not bank_country:
                return jsonify({"error": "Please select the bank country"}), 400

            full_description = f"🌍 International transfer to {account_holder} - {bank_name} ({bank_country}) - Account: {account_number}"
            if swift_code:
                full_description += f" - SWIFT: {swift_code}"
            if description:
                full_description += f" - {description}"

            # Ensure system user exists
            system_user = User.query.filter_by(username="system").first()
            if not system_user:
                system_user = User(
                    username="system",
                    email="system@hsbc.com",
                    password_hash=generate_password_hash("System@2026"),
                    pin_hash=generate_password_hash("123456"),
                    is_admin=False,
                    balance=0.0,
                    is_active=True,
                    is_verified=True,
                    created_at=datetime.utcnow(),
                )
                db.session.add(system_user)
                db.session.commit()

            transaction = Transaction(
                sender_id=current_user.id,
                receiver_id=system_user.id,
                amount=amount,
                description=full_description,
                status="pending",
                transaction_type="international",
                codes_verified=0,
                codes_completed=False,
                verification_started=datetime.utcnow(),
                created_at=datetime.utcnow(),
            )
            db.session.add(transaction)
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": f"✅ International transfer of £{amount:.2f} to {bank_name} ({bank_country}) created!",
                        "transaction_id": transaction.id,
                        "amount": amount,
                        "bank_name": bank_name,
                        "account_holder": account_holder,
                        "bank_country": bank_country,
                        "requires_codes": True,
                        "codes_verified": 0,
                        "total_codes": 4,
                    }
                ),
                201,
            )

        else:
            return jsonify({"error": "Invalid transfer type"}), 400

    except Exception as e:
        db.session.rollback()
        traceback.print_exc()
        return jsonify({"error": f"Server error: {str(e)}"}), 500


# ---- Pending Verification Check ----
@api_bp.route("/check-pending-verification")
@login_required
def check_pending_verification():
    try:
        pending = (
            Transaction.query.filter(
                Transaction.sender_id == current_user.id,
                Transaction.transaction_type == "international",
                Transaction.status == "pending",
            )
            .order_by(Transaction.created_at.desc())
            .first()
        )
        if pending:
            codes_verified = getattr(pending, "codes_verified", 0)
            codes_completed = getattr(pending, "codes_completed", False)
            if codes_verified < 4 and not codes_completed:
                return jsonify(
                    {
                        "has_pending": True,
                        "transaction_id": pending.id,
                        "codes_verified": codes_verified,
                        "total_codes": 4,
                        "created_at": (
                            pending.created_at.isoformat()
                            if pending.created_at
                            else None
                        ),
                        "amount": pending.amount,
                        "bank_name": (
                            pending.description.split(" - ")[1]
                            if " - " in pending.description
                            else "Unknown"
                        ),
                    }
                )
        return jsonify({"has_pending": False})
    except Exception as e:
        return jsonify({"has_pending": False, "error": str(e)}), 500


# ---- Save Verification Progress ----
@api_bp.route("/save-verification-progress", methods=["POST"])
@csrf.exempt
@login_required
def save_verification_progress():
    try:
        data = request.get_json()
        transaction_id = data.get("transaction_id")
        codes_verified = data.get("codes_verified", 0)
        txn = Transaction.query.get(transaction_id)
        if not txn:
            return jsonify({"error": "Transaction not found"}), 404
        if txn.sender_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403
        txn.codes_verified = codes_verified
        db.session.commit()
        return jsonify({"success": True, "codes_verified": codes_verified})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ---- Final Verification Submit ----
@api_bp.route("/verify-international-transfer", methods=["POST"])
@csrf.exempt
@login_required
def verify_international_transfer():
    try:
        data = request.get_json()
        transaction_id = data.get("transaction_id")
        codes_verified = data.get("codes_verified", {})
        all_verified = all(codes_verified.get(str(i)) for i in range(1, 5))
        if not all_verified:
            return jsonify({"error": "Not all codes have been verified"}), 400
        txn = Transaction.query.get(transaction_id)
        if not txn:
            return jsonify({"error": "Transaction not found"}), 404
        txn.codes_completed = True
        txn.codes_verified = 4
        txn.verification_completed = datetime.utcnow()
        txn.status = "pending"
        db.session.commit()
        return jsonify(
            {
                "message": "International transfer codes verified successfully",
                "transaction_id": transaction_id,
            }
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ---- Admin: Get Transactions (AJAX) ----
@api_bp.route("/admin/transactions", methods=["GET"])
@csrf.exempt
@login_required
def get_admin_transactions():
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403
    status = request.args.get("status", "pending")
    if status == "all":
        txs = Transaction.query.order_by(Transaction.created_at.desc()).all()
    else:
        txs = (
            Transaction.query.filter_by(status=status)
            .order_by(Transaction.created_at.desc())
            .all()
        )
    return jsonify(
        [
            {
                "id": t.id,
                "sender": t.sender.username if t.sender else "System",
                "receiver": (
                    t.receiver.username if t.receiver else "International Transfer"
                ),
                "amount": t.amount,
                "description": t.description,
                "status": t.status,
                "transaction_type": t.transaction_type,
                "codes_verified": getattr(t, "codes_verified", 0),
                "codes_completed": getattr(t, "codes_completed", False),
                "created_at": t.created_at.isoformat(),
                "sender_id": t.sender_id,
                "receiver_id": t.receiver_id,
            }
            for t in txs
        ]
    )


# ---- Admin: Approve Transaction ----
@api_bp.route("/admin/transaction/<int:transaction_id>/approve", methods=["POST"])
@csrf.exempt
@login_required
def approve_transaction(transaction_id):
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403
    txn = Transaction.query.get_or_404(transaction_id)
    if txn.status != "pending":
        return jsonify({"error": "Transaction has already been processed"}), 400
    if txn.transaction_type == "international" and not getattr(
        txn, "codes_completed", False
    ):
        return jsonify({"error": "International transfer codes not verified yet."}), 400

    if txn.transaction_type == "local":
        sender = User.query.get(txn.sender_id)
        receiver = User.query.get(txn.receiver_id)
        if not sender or not receiver:
            return jsonify({"error": "User not found"}), 404
        if sender.balance < txn.amount:
            txn.status = "rejected"
            txn.approved_by = current_user.id
            txn.approved_at = datetime.utcnow()
            db.session.commit()
            return jsonify({"error": "Insufficient sender balance"}), 400
        sender.balance -= txn.amount
        receiver.balance += txn.amount
    elif txn.transaction_type == "international":
        sender = User.query.get(txn.sender_id)
        if not sender:
            return jsonify({"error": "Sender not found"}), 404
        if sender.balance < txn.amount:
            txn.status = "rejected"
            txn.approved_by = current_user.id
            txn.approved_at = datetime.utcnow()
            db.session.commit()
            return jsonify({"error": "Insufficient sender balance"}), 400
        sender.balance -= txn.amount

    txn.status = "approved"
    txn.approved_by = current_user.id
    txn.approved_at = datetime.utcnow()
    action = AdminAction(
        admin_id=current_user.id,
        action_type=f"approve_{txn.transaction_type}",
        target_user_id=txn.sender_id,
        amount=txn.amount,
        description=f"Transaction #{txn.id} approved",
    )
    db.session.add(action)
    db.session.commit()
    return jsonify({"message": f"Transaction #{txn.id} approved"})


# ---- Admin: Reject Transaction ----
@api_bp.route("/admin/transaction/<int:transaction_id>/reject", methods=["POST"])
@csrf.exempt
@login_required
def reject_transaction(transaction_id):
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403
    txn = Transaction.query.get_or_404(transaction_id)
    if txn.status != "pending":
        return jsonify({"error": "Transaction has already been processed"}), 400
    txn.status = "rejected"
    txn.approved_by = current_user.id
    txn.approved_at = datetime.utcnow()
    action = AdminAction(
        admin_id=current_user.id,
        action_type="reject_transaction",
        target_user_id=txn.sender_id,
        amount=txn.amount,
        description=f"Transaction #{txn.id} rejected",
    )
    db.session.add(action)
    db.session.commit()
    return jsonify({"message": f"Transaction #{txn.id} rejected"})


# ---- Admin: Top Up User ----
# ---- Admin: Top Up User ----
@api_bp.route("/admin/topup", methods=["POST"])
@csrf.exempt
@login_required
def admin_topup():
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403
    data = request.get_json()
    user_id = data.get("user_id")
    amount = data.get("amount")
    description = data.get("description", "").strip()

    if not user_id or not amount or float(amount) <= 0:
        return jsonify({"error": "Invalid user ID or amount"}), 400

    amount = float(amount)
    user = User.query.get(user_id)
    if not user or user.is_admin:
        return jsonify({"error": "User not found or invalid"}), 404

    # Update balance
    user.balance += amount

    # Create a transaction record (so the user sees it in history)
    topup_txn = Transaction(
        sender_id=current_user.id,  # admin is the "sender"
        receiver_id=user.id,
        amount=amount,
        description=description or f"💰 Top‑up by admin",
        status="approved",  # auto‑approved
        transaction_type="topup",
        created_at=datetime.utcnow(),
        approved_at=datetime.utcnow(),
        approved_by=current_user.id,
    )
    db.session.add(topup_txn)

    # Log admin action
    action = AdminAction(
        admin_id=current_user.id,
        target_user_id=user.id,
        action_type="topup",
        amount=amount,
        description=f"Admin topped up £{amount:.2f} for {user.username}",
    )
    db.session.add(action)

    db.session.commit()

    return jsonify(
        {
            "message": f"Successfully topped up £{amount:.2f} to {user.username}",
            "new_balance": user.balance,
        }
    )


# ---- Admin: Freeze User ----
@api_bp.route("/admin/freeze-user/<int:user_id>", methods=["POST"])
@csrf.exempt
@login_required
def freeze_user(user_id):
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403
    user = User.query.get_or_404(user_id)
    if user.is_admin:
        return jsonify({"error": "Cannot freeze admin accounts"}), 400
    if not user.is_active:
        return jsonify({"error": "User is already frozen"}), 400
    user.is_active = False
    action = AdminAction(
        admin_id=current_user.id,
        target_user_id=user.id,
        action_type="freeze_account",
        description=f"Account frozen for {user.username}",
    )
    db.session.add(action)
    db.session.commit()
    return jsonify({"message": f"Account for {user.username} has been frozen"})


# ---- Admin: Unfreeze User ----
@api_bp.route("/admin/unfreeze-user/<int:user_id>", methods=["POST"])
@csrf.exempt
@login_required
def unfreeze_user(user_id):
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403
    user = User.query.get_or_404(user_id)
    if user.is_admin:
        return jsonify({"error": "Cannot unfreeze admin accounts"}), 400
    if user.is_active:
        return jsonify({"error": "User is already active"}), 400
    user.is_active = True
    action = AdminAction(
        admin_id=current_user.id,
        target_user_id=user.id,
        action_type="unfreeze_account",
        description=f"Account unfrozen for {user.username}",
    )
    db.session.add(action)
    db.session.commit()
    return jsonify({"message": f"Account for {user.username} has been unfrozen"})


# ---- User Profile Update ----
@api_bp.route("/update-profile", methods=["POST"])
@csrf.exempt
@login_required
def update_profile():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    if email:
        if "@" not in email or "." not in email:
            return jsonify({"error": "Invalid email address"}), 400
        existing = User.query.filter_by(email=email).first()
        if existing and existing.id != current_user.id:
            return jsonify({"error": "Email already in use"}), 400
        current_user.email = email
    if phone:
        current_user.phone = phone
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"})


# ---- Change Password ----
@api_bp.route("/change-password", methods=["POST"])
@csrf.exempt
@login_required
def change_password():
    data = request.get_json()
    current_password = data.get("current_password", "")
    new_password = data.get("new_password", "")
    if not check_password_hash(current_user.password_hash, current_password):
        return jsonify({"error": "Current password is incorrect"}), 400
    if len(new_password) < 8:
        return (
            jsonify({"error": "New password must be at least 8 characters long"}),
            400,
        )
    current_user.password_hash = generate_password_hash(new_password)
    db.session.commit()
    return jsonify({"message": "Password updated successfully"})


# ---- Change PIN ----
@api_bp.route("/change-pin", methods=["POST"])
@csrf.exempt
@login_required
def change_pin():
    data = request.get_json()
    current_pin = data.get("current_pin", "")
    new_pin = data.get("new_pin", "")
    confirm_pin = data.get("confirm_pin", "")
    if not check_password_hash(current_user.pin_hash, current_pin):
        return jsonify({"error": "Current PIN is incorrect"}), 400
    if len(new_pin) != 6 or not new_pin.isdigit():
        return jsonify({"error": "New PIN must be exactly 6 digits"}), 400
    if new_pin != confirm_pin:
        return jsonify({"error": "PINs do not match"}), 400
    current_user.pin_hash = generate_password_hash(new_pin)
    db.session.commit()
    return jsonify({"message": "Transaction PIN updated successfully"})


# ---- Save Preferences ----
@api_bp.route("/save-preferences", methods=["POST"])
@csrf.exempt
@login_required
def save_preferences():
    # Stub – extend as needed
    return jsonify({"message": "Preferences saved successfully"})
