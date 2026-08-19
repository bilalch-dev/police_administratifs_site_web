import os


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'police_portal_super_secret_key_2026')

    # Database Config - PostgreSQL or SQLite fallback
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'police_portal.db')
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Config
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt_secret_police_administrative_2026')
