from app.models.product import Product


def mark_as_wasted(db, product_id, user_id):
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.owner_id == user_id
    ).first()

    product.is_wasted = True
    db.commit()
    return product
