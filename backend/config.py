import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REMEMBER_COOKIE_DURATION = timedelta(days=7)
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB
    UPLOAD_FOLDER = os.path.join(basedir, "..", "frontend", "static", "uploads")
    ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "pdf"}

    # Security flags – production will override these
    SESSION_COOKIE_SECURE = False
    REMEMBER_COOKIE_SECURE = False


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "banking.db")
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_ECHO = False
    SESSION_COOKIE_SECURE = True
    REMEMBER_COOKIE_SECURE = True

    # ⭐ SQLite on Render’s persistent disk
    DB_DIR = os.environ.get("RENDER_DISK_PATH", os.path.join(basedir, ".."))
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(DB_DIR, "banking.db")


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
