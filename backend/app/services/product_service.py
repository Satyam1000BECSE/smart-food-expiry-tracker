from app.models.product import Product
from app.services.expiry_checker import calculate_status
from datetime import date

def create_product(db, product_data, user_id):
    product = Product(**product_data.dict(), owner_id=user_id)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

def get_products(db, user_id):
    products = db.query(Product).filter(Product.owner_id == user_id).all()

    result = []

    for product in products:
        status, days_left = calculate_status(product)

        result.append({
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "quantity": product.quantity,
            "unit": product.unit,
            "expiry_date": product.expiry_date,
            "is_wasted": product.is_wasted,
            "status": status,
            "days_left": days_left
        })

    return result


def search_products(db, user_id, name=None, category=None):
    query = db.query(Product).filter(Product.owner_id == user_id)

    if name:
        query = query.filter(Product.name.ilike(f"%{name}%"))

    if category:
        query = query.filter(Product.category == category)

    products = query.all()

    result = []

    for product in products:
        status, days_left = calculate_status(product)

        result.append({
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "quantity": product.quantity,
            "unit": product.unit,
            "expiry_date": product.expiry_date,
            "is_wasted": product.is_wasted,
            "status": status,
            "days_left": days_left
        })

    return result


