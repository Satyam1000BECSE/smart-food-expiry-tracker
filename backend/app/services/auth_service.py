from app.models.user import User
from app.utils.hash import hash_password, verify_password
from app.utils.jwt_handler import create_token

def register_user(db, user_data):
    hashed = hash_password(user_data.password)
    user = User(name=user_data.name,
                email=user_data.email,
                password=hashed)
    db.add(user)
    db.commit()
    return {"message": "User Created"}

def login_user(db, user_data):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password):
        return None
    return create_token({"user_id": user.id})
