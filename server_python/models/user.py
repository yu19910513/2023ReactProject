from sqlalchemy import Column, Integer, String, Boolean, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
import base64
from sqlalchemy.orm import Query
from typing import TypeVar, Type
from bcrypt import hashpw, gensalt
from flask_sqlalchemy import SQLAlchemy
import os

Base = declarative_base()
T = TypeVar('T', bound='User')

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    admin = Column(Boolean, default=False)
    thumbnail = Column(LargeBinary, nullable=True)

    @classmethod
    def query(cls: Type[T]) -> Query[T]:
        return Query[T](cls)

    def __init__(self, name, email, password, confirmedPassword, adminSecret):
        self.email = email
        self.password = hashpw(str.encode(password), gensalt())
        self.name = name
        if adminSecret == os.getenv('ADMIN_SECRET'): self.admin = True
        else: self.admin = False
        self.thumbnail = None

    @property
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'admin': self.admin,
            'name': self.name,
            'thumbnail': base64.b64encode(self.thumbnail).decode('utf-8') if self.thumbnail else None
        }


    query: Query
