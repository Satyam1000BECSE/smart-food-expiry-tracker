from datetime import date

def calculate_status(product):
    today = date.today()

    expiry_date = product.expiry_date  # 👈 extract here

    days_left = (expiry_date - today).days

    if days_left < 0:
        return "Expired", days_left
    elif days_left <= 3:
        return "Expiring Soon", days_left
    else:
        return "Fresh", days_left


