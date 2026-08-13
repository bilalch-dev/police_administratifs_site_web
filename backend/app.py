from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db, User, Complaint, generate_tracking_id
import hashlib

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    JWTManager(app)

    # Register Blueprints
    from routes.complaints import complaints_bp
    from routes.admin import admin_bp
    from routes.auth import auth_bp

    app.register_blueprint(complaints_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(auth_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "service": "Police Administrative Flask API"}), 200

    # Auto-initialize DB and create default admin user if not existing
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(username="admin").first():
            default_admin = User(
                username="admin",
                password_hash=hashlib.sha256("admin123".encode()).hexdigest(),
                role="ADMIN"
            )
            db.session.add(default_admin)
            
            # Seed demo complaint if empty
            if not Complaint.query.first():
                demo_complaint = Complaint(
                    id="POL-2026-78A1B",
                    name="أحمد بناني",
                    phone="0661234567",
                    category="النظافة والبيئة",
                    title="تجمع نفايات هامشية بشارع الحسن الثاني",
                    location="حي السلام - قرب المدرسة الابتدائية",
                    details="تراكم الأزبال والنفايات المنزلية قرب المدرسة الابتدائية مما يسبب روائح وانزعاجاً للساكنة.",
                    status="قيد المعاينة الميدانية (BMH)",
                    status_step=2,
                    notes="تم إرسال فريق المكتب الصحي الجماعي للمعاينة واتخاذ الإجراء."
                )
                db.session.add(demo_complaint)

            db.session.commit()
            print("Database initialized and default admin (admin/admin123) created.")

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
