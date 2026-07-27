"""
Database models for the banking application
"""

from backend.extensions import db
from flask_login import UserMixin  # ← THIS LINE MUST BE HERE
from datetime import datetime
import uuid
import json

# ============================================
# USER MODELS
# ============================================


class User(UserMixin, db.Model):
    """Main User model - Active accounts only"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.String(20), unique=True, nullable=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(200), nullable=False)
    pin_hash = db.Column(db.String(200), nullable=True)

    # Personal Information
    title = db.Column(db.String(20))
    first_name = db.Column(db.String(50))
    middle_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(20))
    marital_status = db.Column(db.String(30))
    nationality = db.Column(db.String(50))

    # Contact Information
    phone = db.Column(db.String(20))
    alt_phone = db.Column(db.String(20))
    country_of_residence = db.Column(db.String(50))
    city = db.Column(db.String(50))
    county_state = db.Column(db.String(50))
    address = db.Column(db.String(200))
    postcode = db.Column(db.String(20))

    # Employment Information
    employment_status = db.Column(db.String(30))
    profession = db.Column(db.String(50))
    employer_name = db.Column(db.String(100))
    employer_address = db.Column(db.String(200))
    annual_income_range = db.Column(db.String(50))
    source_of_funds = db.Column(db.String(100))

    # Account Information
    account_type = db.Column(db.String(50))
    preferred_currency = db.Column(db.String(10), default="GBP")
    account_number = db.Column(db.String(20), unique=True)
    sort_code = db.Column(db.String(20))
    iban = db.Column(db.String(34))
    swift_bic = db.Column(db.String(11))
    balance = db.Column(db.Float, default=0.0)

    # Tax Information
    national_insurance_number = db.Column(db.String(20))
    tax_residency_country = db.Column(db.String(50))
    tax_identification_number = db.Column(db.String(50))

    # Declarations
    is_pep = db.Column(db.Boolean, default=False)
    is_us_person = db.Column(db.Boolean, default=False)
    crs_declaration = db.Column(db.Boolean, default=False)

    # Status
    is_admin = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    is_locked = db.Column(db.Boolean, default=False)

    # Profile Photo
    profile_photo = db.Column(db.String(300), nullable=True)

    # Timestamps
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    approved_at = db.Column(db.DateTime)
    approved_by = db.Column(db.Integer, db.ForeignKey("users.id"))

    # Relationships
    applications = db.relationship(
        "PendingApplication",
        foreign_keys="PendingApplication.user_id",
        backref="user",
        lazy="dynamic",
    )

    emergency_contacts = db.relationship(
        "EmergencyContact",
        foreign_keys="EmergencyContact.user_id",
        backref="user",
        lazy="dynamic",
    )

    transactions_sent = db.relationship(
        "Transaction",
        foreign_keys="Transaction.sender_id",
        backref="sender",
        lazy="dynamic",
    )

    transactions_received = db.relationship(
        "Transaction",
        foreign_keys="Transaction.receiver_id",
        backref="receiver",
        lazy="dynamic",
    )

    admin_actions = db.relationship(
        "AdminAction",
        foreign_keys="AdminAction.admin_id",
        backref="admin",
        lazy="dynamic",
    )

    user_actions = db.relationship(
        "AdminAction",
        foreign_keys="AdminAction.target_user_id",
        backref="target_user",
        lazy="dynamic",
    )

    reviewed_applications = db.relationship(
        "PendingApplication",
        foreign_keys="PendingApplication.reviewed_by",
        backref="reviewer",
        lazy="dynamic",
    )

    assigned_applications = db.relationship(
        "PendingApplication",
        foreign_keys="PendingApplication.assigned_to",
        backref="assignee",
        lazy="dynamic",
    )

    def get_full_name(self):
        return f"{self.title} {self.first_name} {self.last_name}".strip()

    def get_balance_formatted(self):
        return f"£{self.balance:,.2f}"

    def get_profile_photo_url(self):
        """Get the profile photo URL or return None"""
        if self.profile_photo:
            # Check if it's a relative path from static
            if self.profile_photo.startswith("frontend/static/"):
                return "/" + self.profile_photo.replace("frontend/static/", "static/")
            return self.profile_photo
        return None

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "username": self.username,
            "email": self.email,
            "full_name": self.get_full_name(),
            "account_number": self.account_number,
            "balance": self.balance,
            "is_active": self.is_active,
            "is_verified": self.is_verified,
            "profile_photo": self.get_profile_photo_url(),
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


# ============================================
# TRANSACTION MODEL (UPDATED WITH VERIFICATION FIELDS)
# ============================================


class Transaction(db.Model):
    """Transaction model - Supports local and international with verification"""

    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(500))

    status = db.Column(db.String(20), default="pending", index=True)
    transaction_type = db.Column(db.String(20), default="local")

    # ==========================================
    # VERIFICATION FIELDS FOR INTERNATIONAL TRANSFERS
    # ==========================================
    codes_verified = db.Column(db.Integer, default=0)  # 0-4
    codes_completed = db.Column(db.Boolean, default=False)
    verification_started = db.Column(db.DateTime, nullable=True)
    verification_completed = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    approved_at = db.Column(db.DateTime, nullable=True)

    approved_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    def get_status_color(self):
        colors = {
            "pending": "warning",
            "approved": "success",
            "rejected": "danger",
            "cancelled": "secondary",
        }
        return colors.get(self.status, "secondary")

    def is_pending(self):
        return self.status == "pending"

    def is_approved(self):
        return self.status == "approved"

    def is_rejected(self):
        return self.status == "rejected"

    def needs_codes(self):
        return (
            self.transaction_type == "international"
            and not self.codes_completed
            and self.codes_verified < 4
        )

    def to_dict(self):
        return {
            "id": self.id,
            "sender": self.sender.username if self.sender else "System",
            "receiver": (
                self.receiver.username if self.receiver else "International Transfer"
            ),
            "amount": self.amount,
            "description": self.description,
            "status": self.status,
            "transaction_type": self.transaction_type,
            "codes_verified": self.codes_verified,
            "codes_completed": self.codes_completed,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "approved_at": self.approved_at.isoformat() if self.approved_at else None,
        }


# ============================================
# PENDING APPLICATION MODEL
# ============================================


class PendingApplication(db.Model):
    """Pending KYC applications awaiting admin review"""

    __tablename__ = "pending_applications"

    id = db.Column(db.Integer, primary_key=True)
    application_ref = db.Column(db.String(20), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    form_data = db.Column(db.Text)

    kyc_status = db.Column(db.String(20), default="pending_review")

    reviewed_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    reviewed_at = db.Column(db.DateTime, nullable=True)
    rejection_reason = db.Column(db.Text, nullable=True)
    review_notes = db.Column(db.Text, nullable=True)
    assigned_to = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(200), nullable=True)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    documents = db.relationship(
        "KycDocument",
        foreign_keys="KycDocument.application_id",
        backref="application",
        lazy="dynamic",
    )

    approval_history = db.relationship(
        "ApprovalHistory",
        foreign_keys="ApprovalHistory.application_id",
        backref="application",
        lazy="dynamic",
    )

    def generate_ref(self):
        timestamp = datetime.utcnow().strftime("%Y%m%d")
        unique_id = str(uuid.uuid4().hex[:6]).upper()
        return f"HSBC-{timestamp}-{unique_id}"

    def __init__(self, **kwargs):
        super(PendingApplication, self).__init__(**kwargs)
        if not self.application_ref:
            self.application_ref = self.generate_ref()

    def to_dict(self):
        return {
            "id": self.id,
            "application_ref": self.application_ref,
            "kyc_status": self.kyc_status,
            "submitted_at": (
                self.submitted_at.isoformat() if self.submitted_at else None
            ),
            "review_notes": self.review_notes,
            "rejection_reason": self.rejection_reason,
        }


# ============================================
# KYC DOCUMENTS MODEL
# ============================================


class KycDocument(db.Model):
    """KYC documents uploaded by users"""

    __tablename__ = "kyc_documents"

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer, db.ForeignKey("pending_applications.id"), nullable=True
    )
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    document_type = db.Column(db.String(50))
    document_sub_type = db.Column(db.String(30))
    file_name = db.Column(db.String(200))
    file_path = db.Column(db.String(300))
    file_size = db.Column(db.Integer)
    file_type = db.Column(db.String(20))

    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    verified_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    verified_at = db.Column(db.DateTime, nullable=True)
    verification_status = db.Column(db.String(20), default="pending")
    verification_notes = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "document_type": self.document_type,
            "file_name": self.file_name,
            "file_path": self.file_path,
            "verification_status": self.verification_status,
            "upload_date": self.upload_date.isoformat() if self.upload_date else None,
        }


# ============================================
# SECURITY QUESTIONS MODEL
# ============================================


class SecurityQuestion(db.Model):
    """Security questions for account recovery"""

    __tablename__ = "security_questions"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question = db.Column(db.String(200))
    answer_hash = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# ============================================
# EMERGENCY CONTACT MODEL
# ============================================


class EmergencyContact(db.Model):
    """Emergency contact information"""

    __tablename__ = "emergency_contacts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    full_name = db.Column(db.String(100))
    relationship = db.Column(db.String(50))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    address = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# ============================================
# ADMIN ACTION MODEL
# ============================================


class AdminAction(db.Model):
    """Admin action log model"""

    __tablename__ = "admin_actions"

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    target_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    action_type = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=True)
    description = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def to_dict(self):
        return {
            "id": self.id,
            "admin": self.admin.username if self.admin else None,
            "target_user": self.target_user.username if self.target_user else None,
            "action_type": self.action_type,
            "amount": self.amount,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


# ============================================
# USER PREFERENCES MODEL
# ============================================


class UserPreference(db.Model):
    """User preferences"""

    __tablename__ = "user_preferences"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False
    )

    two_factor_enabled = db.Column(db.Boolean, default=True)
    biometric_enabled = db.Column(db.Boolean, default=False)
    transaction_notifications = db.Column(db.Boolean, default=True)
    login_alerts = db.Column(db.Boolean, default=True)
    marketing_emails = db.Column(db.Boolean, default=False)
    statement_notifications = db.Column(db.Boolean, default=True)
    data_sharing = db.Column(db.Boolean, default=False)

    language = db.Column(db.String(10), default="en")
    currency = db.Column(db.String(3), default="GBP")
    theme = db.Column(db.String(20), default="light")

    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    user = db.relationship("User", backref=db.backref("preferences", uselist=False))


# ============================================
# AUDIT LOG MODEL
# ============================================


class AuditLog(db.Model):
    """Audit log for all system actions"""

    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    action = db.Column(db.String(50))
    details = db.Column(db.Text)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "action": self.action,
            "details": self.details,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


# ============================================
# NOTIFICATION MODEL
# ============================================


class Notification(db.Model):
    """System notifications"""

    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    type = db.Column(db.String(30))
    subject = db.Column(db.String(200))
    message = db.Column(db.Text)
    is_read = db.Column(db.Boolean, default=False)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    read_at = db.Column(db.DateTime, nullable=True)


# ============================================
# APPROVAL HISTORY MODEL
# ============================================


class ApprovalHistory(db.Model):
    """History of all KYC approvals/rejections"""

    __tablename__ = "approval_histories"

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer, db.ForeignKey("pending_applications.id"), nullable=False
    )
    admin_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    action = db.Column(db.String(20))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    admin = db.relationship("User", foreign_keys=[admin_id])
