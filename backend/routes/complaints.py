from flask import Blueprint, jsonify, request
from models import Complaint, db

complaints_bp = Blueprint('complaints', __name__)


@complaints_bp.route('/api/complaints', methods=['POST'])
def create_complaint():
    """Public endpoint to submit a citizen complaint"""
    data = request.get_json()

    if not data or not all(k in data for k in ('name', 'phone', 'category', 'title', 'location', 'details')):
        return jsonify({"error": "جميع الحقول مطلوبة"}), 400

    new_complaint = Complaint(
        name=data['name'],
        phone=data['phone'],
        category=data['category'],
        title=data['title'],
        location=data['location'],
        details=data['details']
    )

    db.session.add(new_complaint)
    db.session.commit()

    return jsonify({
        "message": "تم تسجيل البلاغ بنجاح",
        "complaint": new_complaint.to_dict()
    }), 201


@complaints_bp.route('/api/complaints/<tracking_id>', methods=['GET'])
def get_complaint(tracking_id):
    """Public endpoint to track a complaint by its unique tracking code"""
    complaint = Complaint.query.filter_by(id=tracking_id.upper()).first()

    if not complaint:
        return jsonify({"error": "لم يتم العثور على شكاية بهذا الرمز"}), 404

    return jsonify({"complaint": complaint.to_dict()}), 200
