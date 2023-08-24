from flask_migrate import Migrate
from config import app, db
from models import db, User
from flask import request, session


@app.route('/')
def home():
    return 'home'

@app.post('/signup')
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    new_user = User(
        username=username
    )
    new_user.password_hash = password
    try:
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except ValueError:
        return {'error': 'unable to process your input'}, 422

@app.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.authenticate(data['password']):
        return {'error': 'invalid input'}, 400
    session['user_id'] = user.id
    return user.to_dict(), 201

@app.get('/check_session')
def auto_login():
    user = User.query.filter_by(id=session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    return {'error': 'unauthorized'}, 401

@app.delete('/logout')
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return {'message': 'logged out'}, 204
    return {'error': 'session not found'}, 404

if __name__ == '__main__':
    app.run(debug=True)