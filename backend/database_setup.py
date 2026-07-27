from backend.extensions import db
from backend.models import User
from werkzeug.security import generate_password_hash
from datetime import datetime


def create_default_data():
    """Create admin and system user if they don't exist."""

    # System user (REQUIRED for international transfers)
    if not User.query.filter_by(username="system").first():
        system = User(
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
        db.session.add(system)
        print("✅ System user created for international transfers.")

    # Admin user
    if not User.query.filter_by(username="admin").first():
        admin = User(
            username="admin",
            email="admin@hsbc.com",
            password_hash=generate_password_hash("Admin@2026"),
            pin_hash=generate_password_hash("123456"),
            is_admin=True,
            balance=0.0,
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
        )
        db.session.add(admin)
        print("✅ Admin user created: admin / Admin@2026 / PIN: 123456")
    else:
        admin = User.query.filter_by(username="admin").first()
        if not admin.is_active:
            admin.is_active = True
            admin.is_verified = True
            db.session.commit()
            print("✅ Admin activated.")

    db.session.commit()
    print("✅ Database ready – admin and system user only.")
