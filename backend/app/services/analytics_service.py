from sqlalchemy import func
from app.models.product import Product
from datetime import date

def get_dashboard_stats(db, user_id):
    today = date.today()

    total = db.query(Product).filter(
        Product.owner_id == user_id
    ).count()

    expired = db.query(Product).filter(
        Product.owner_id == user_id,
        Product.expiry_date < today
    ).count()

    active = db.query(Product).filter(
        Product.owner_id == user_id,
        Product.expiry_date >= today
    ).count()

    category_data = db.query(
        Product.category,
        func.count(Product.id)
    ).filter(
        Product.owner_id == user_id
    ).group_by(Product.category).all()

    # 🔥 Convert tuples to proper JSON
    category_breakdown = [
        {"category": item[0], "count": item[1]}
        for item in category_data
    ]

    return {
        "total_items": total,
        "expired_items": expired,
        "active_items": active,
        "category_breakdown": category_breakdown
    }


