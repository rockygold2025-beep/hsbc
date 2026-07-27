import os
import json
from flask import Flask
from backend.config import config
from backend.extensions import db, login_manager, csrf
from backend.database_setup import create_default_data


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get("FLASK_ENV", "production")
    app = Flask(
        __name__,
        template_folder=os.path.join(
            os.path.dirname(__file__), "..", "frontend", "templates"
        ),
        static_folder=os.path.join(
            os.path.dirname(__file__), "..", "frontend", "static"
        ),
    )
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)

    # ✅ Register the json_loads filter
    def json_loads_filter(data):
        try:
            return json.loads(data) if data else {}
        except:
            return {}

    app.jinja_env.filters["json_loads"] = json_loads_filter

    # Register blueprints
    from backend.routes.main import main_bp
    from backend.routes.auth import auth_bp
    from backend.routes.user import user_bp
    from backend.routes.admin import admin_bp
    from backend.routes.api import api_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(api_bp)

    # User loader
    from backend.models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Create tables and default data
    with app.app_context():
        db.create_all()
        create_default_data()

    # Register CLI commands
    from backend.cli import add_pins_command

    app.cli.add_command(add_pins_command)

    return app
