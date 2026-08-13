from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User
import hashlib

auth_bp = Blueprint('auth', __name__)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    """Municipal Officer Login to receive JWT token"""
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "اسم المستخدم وكلمة المرور مطلوبة"}), 400

    username = data['username']
    password = data['password']
    pwd_hash = hash_password(password)

    user = User.query.filter_by(username=username, password_hash=pwd_hash).first()
    if not user:
        return jsonify({"error": "اسم المستخدم أو كلمة المرور غير صحيحة"}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify({
        "message": "تم تسجيل الدخول بنجاح",
        "token": access_token,
        "user": user.to_dict()
    }), 200
