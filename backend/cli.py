import click
from flask.cli import with_appcontext
from backend.extensions import db
from backend.models import User
from werkzeug.security import generate_password_hash


@click.command("add-pins")
@with_appcontext
def add_pins_command():
    """Add default PIN '123456' to all users who lack one."""
    users = User.query.filter(User.pin_hash.is_(None)).all()
    if not users:
        click.echo("✅ All users already have PINs.")
        return
    for user in users:
        user.pin_hash = generate_password_hash("123456")
        click.echo(f"  ✅ PIN added to {user.username}")
    db.session.commit()
    click.echo("✅ All users now have a PIN (123456).")
