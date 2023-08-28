from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    _password_hash = db.Column(db.String(50), nullable=False)

    user_messages = db.relationship('Message', backref='user', cascade='all')
    workouts = db.relationship('UserWorkout', backref='user', cascade='all')

    serialize_rules = ('-user_messages.user', '-_password_hash', '-workouts.user',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('permission denied')
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    body_section = db.Column(db.String(50))
    description = db.Column(db.String(200))

    users = db.relationship('UserWorkout', backref='workout', cascade='all')

    serialize_rules = ('-users.workout',)

class UserWorkout(db.Model, SerializerMixin):
    __tablename__ = 'user_workouts'
    id = db.Column(db.Integer, primary_key=True)
    workout_count = db.Column(db.Integer)
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    serialize_rules = ('-workout.users', '-user.workouts',)

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500))
    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ('-user.user_messages',)
