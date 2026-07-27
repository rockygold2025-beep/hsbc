from backend.extensions import db
from backend.models import User
from werkzeug.security import generate_password_hash
from datetime import datetime


def create_default_data():
    """Create system user and default users only if they don't exist."""

    # System user for international transfers
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
        print("✅ System user created.")

    # Admin – check if ANY admin already exists
    if not User.query.filter_by(is_admin=True).first():
        admin = User(
            username="bankmanager",
            email="admin@hsbc.com",
            password_hash=generate_password_hash("Bankmanager@2026"),
            pin_hash=generate_password_hash("123456"),
            is_admin=True,
            balance=0.0,
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
        )
        db.session.add(admin)
        print("✅ Admin user created: bankmanager / Bankmanager@2026 / PIN: 123456")
    else:
        print("✅ An admin user already exists – skipping default creation.")

    # Demo
    if not User.query.filter_by(username="demo").first():
        demo = User(
            username="demo",
            email="demo@hsbc.com",
            password_hash=generate_password_hash("Demo@2026"),
            pin_hash=generate_password_hash("123456"),
            is_admin=False,
            balance=1000.0,
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
        )
        db.session.add(demo)
        print("✅ Demo user created: demo / Demo@2026 / PIN: 123456")

    # Test
    if not User.query.filter_by(username="test").first():
        test = User(
            username="test",
            email="test@hsbc.com",
            password_hash=generate_password_hash("Test@2026"),
            pin_hash=generate_password_hash("123456"),
            is_admin=False,
            balance=500.0,
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
        )
        db.session.add(test)
        print("✅ Test user created: test / Test@2026 / PIN: 123456")

    db.session.commit()
    print("✅ Default users ready.")
