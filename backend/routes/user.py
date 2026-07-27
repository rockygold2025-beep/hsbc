from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, current_user
from backend.models import Transaction

user_bp = Blueprint("user", __name__)


@user_bp.route("/dashboard")
@login_required
def dashboard():
    if current_user.is_admin:
        return redirect(url_for("admin.dashboard"))
    transactions = (
        Transaction.query.filter(
            (Transaction.sender_id == current_user.id)
            | (Transaction.receiver_id == current_user.id)
        )
        .order_by(Transaction.created_at.desc())
        .limit(10)
        .all()
    )
    return render_template("user_dashboard.html", transactions=transactions)


@user_bp.route("/payment")
@login_required
def payment():
    if current_user.is_admin:
        return redirect(url_for("admin.dashboard"))
    transactions = (
        Transaction.query.filter(
            (Transaction.sender_id == current_user.id)
            | (Transaction.receiver_id == current_user.id)
        )
        .order_by(Transaction.created_at.desc())
        .limit(20)
        .all()
    )
    return render_template("payment.html", transactions=transactions)


@user_bp.route("/savings")
@login_required
def savings():
    if current_user.is_admin:
        return redirect(url_for("admin.dashboard"))
    return render_template("savings.html")


@user_bp.route("/cards")
@login_required
def cards():
    if current_user.is_admin:
        return redirect(url_for("admin.dashboard"))
    return render_template("cards.html")


@user_bp.route("/settings")
@login_required
def settings():
    if current_user.is_admin:
        return redirect(url_for("admin.dashboard"))
    return render_template("settings.html")


@user_bp.route("/transaction-history")
@login_required
def transaction_history():
    if current_user.is_admin:
        return redirect(url_for("admin.dashboard"))
    transactions = (
        Transaction.query.filter(
            (Transaction.sender_id == current_user.id)
            | (Transaction.receiver_id == current_user.id)
        )
        .order_by(Transaction.created_at.desc())
        .all()
    )
    return render_template("transaction_history.html", transactions=transactions)
