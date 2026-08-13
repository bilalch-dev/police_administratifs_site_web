from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Complaint

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/api/admin/complaints', methods=['GET'])
@jwt_required()
def get_all_complaints():
    """Admin endpoint: Get all complaints with optional status/category filter"""
    category = request.args.get('category')
    status_step = request.args.get('step')

    query = Complaint.query

    if category:
        query = query.filter_by(category=category)
    if status_step:
        query = query.filter_by(status_step=int(status_step))

    complaints = query.order_by(Complaint.created_at.desc()).all()
    return jsonify({"complaints": [c.to_dict() for c in complaints]}), 200

@admin_bp.route('/api/admin/complaints/<tracking_id>', methods=['PUT'])
@jwt_required()
def update_complaint_status(tracking_id):
    """Admin endpoint: Update complaint status step and attach official notes"""
    complaint = Complaint.query.filter_by(id=tracking_id.upper()).first()
    if not complaint:
        return jsonify({"error": "الشكاية غير موجودة"}), 404

    data = request.get_json()
    if 'statusStep' in data:
        complaint.status_step = int(data['statusStep'])
        
        # Map step to default Arabic status description
        step_labels = {
            1: "تم الاستلام وتسجيل البلاغ",
            2: "قيد المعاينة الميدانية (BMH)",
            3: "قيد اتخاذ الإجراء الإداري والتنفيذ",
            4: "تم المعالجة واختتام البلاغ بنجاح"
        }
        complaint.status = data.get('status', step_labels.get(complaint.status_step, complaint.status))

    if 'notes' in data:
        complaint.notes = data['notes']

    db.session.commit()
    return jsonify({
        "message": "تم تحديث حالة الشكاية بنجاح",
        "complaint": complaint.to_dict()
    }), 200
