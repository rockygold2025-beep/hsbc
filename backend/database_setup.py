from backend.extensions import db
from backend.models import User
from werkzeug.security import generate_password_hash
from datetime import datetime


def create_default_data():
    """Create only the admin user if it doesn't exist."""
    if not User.query.filter_by(username="admin").first():
        admin = User(
            username="admin",
            email="admin@hsbc.com",
            password_hash=generate_password_hash("administeration@2026"git),
            pin_hash=generate_password_hash("123456"),
            is_admin=True,
            balance=0.0,
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
        )
        db.session.add(admin)
        print("✅ Admin user created: admin / administeration@2026 / PIN: 123456")
    else:
        admin = User.query.filter_by(username="admin").first()
        if not admin.is_active:
            admin.is_active = True
            admin.is_verified = True
            db.session.commit()
            print("✅ Admin activated.")

    db.session.commit()
    print("✅ Database ready – admin user only.")
