import random
import string
from datetime import datetime


def generate_account_number():
    return "".join(random.choices(string.digits, k=8))


def generate_sort_code():
    parts = ["".join(random.choices(string.digits, k=2)) for _ in range(3)]
    return "-".join(parts)


def generate_customer_id():
    return f"HSBC-{datetime.utcnow().strftime('%Y')}-{random.randint(1000, 9999)}"
