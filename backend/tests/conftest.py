import pytest
import sys
import os
import hashlib

# Add parent directory (backend) to path for importing app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from models import db, User

class TestConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'super_secret_test_key_32_bytes_long_2026'
    JWT_SECRET_KEY = 'super_secure_jwt_secret_key_32_bytes_long_2026'

@pytest.fixture
def app():
    """Create and configure a clean Flask application for testing."""
    test_app = create_app()
    test_app.config.from_object(TestConfig)

    with test_app.app_context():
        db.create_all()
        # Seed test admin user
        if not User.query.filter_by(username="admin").first():
            test_admin = User(
                username="admin",
                password_hash=hashlib.sha256("admin123".encode()).hexdigest(),
                role="ADMIN"
            )
            db.session.add(test_admin)
            db.session.commit()

        yield test_app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    """A test client for the Flask app."""
    return app.test_client()

@pytest.fixture
def auth_headers(client):
    """Generate JWT authorization headers for admin endpoints."""
    response = client.post('/api/auth/login', json={
        "username": "admin",
        "password": "admin123"
    })
    token = response.get_json()['token']
    return {'Authorization': f'Bearer {token}'}
