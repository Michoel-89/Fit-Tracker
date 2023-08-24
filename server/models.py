from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    _password_hash = db.Column(db.String(50), nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('permission denied')
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Workouts(db.Model, SerializerMixin):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)

class Messages(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)

