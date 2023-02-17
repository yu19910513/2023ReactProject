from sqlalchemy import Column, Integer, String, Boolean, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
import bcrypt
import base64


Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    admin = Column(Boolean, default=False)
    thumbnail = Column(LargeBinary, nullable=True)

    def __init__(self, email, password, admin=False, thumbnail=None):
        self.email = email
        self.password = bcrypt.generate_password_hash(password)
        self.admin = admin
        self.thumbnail = thumbnail

    @property
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'admin': self.admin,
            'thumbnail': base64.b64encode(self.thumbnail).decode('utf-8') if self.thumbnail else None
        }
