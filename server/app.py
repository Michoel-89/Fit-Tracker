from flask_migrate import Migrate
from config import app, db, socketio, emit
from models import db, User, Workout, UserWorkout, Message
from flask import request, session


@app.route('/')
def home():
    return 'home'

@app.get('/workouts')
def get_workouts():
    return [workout.to_dict() for workout in Workout.query.all()], 200

@app.get('/user_workouts')
def get_user_workouts():
    user = User.query.filter_by(id=session.get('user_id')).first()
    return [userWorkout.to_dict() for userWorkout in UserWorkout.query.filter_by(user_id=user.id)]

@app.get('/messages')
def get_user_messages():
    return [message.to_dict() for message in Message.query.all()], 200

@app.post('/user_workouts')
def add_user_workout():
    data = request.get_json()
    try:
        user_workout = UserWorkout(
            workout_count=data.get('workout_count'),
            user_id=data.get('user_id'),
            workout_id=data.get('workout_id')
        )
        db.session.add(user_workout)
        db.session.commit()
        return user_workout.to_dict(), 201
    except ValueError:
        return {'error': 'unable to process your input'}, 422
    
@socketio.on('message')
def handle_message(message):
    try:
        new_message = Message(
            text=message.get('text'),
            user_id=message.get('user_id')
        )
        db.session.add(new_message)
        db.session.commit()

        # Emit the new message to all connected clients
        emit('message', new_message.to_dict(), broadcast=True)
    except ValueError:
        return {'error': 'unable to process your input'}, 422
    
@socketio.on('delete')
def handle_delete(delete_data):
    try:
        message_id = delete_data.get('msg_id')

        # Find the message in the database by its ID
        deleted_message = Message.query.filter_by(id=message_id).first()

        if deleted_message:
            # Delete the message from the database
            db.session.delete(deleted_message)
            db.session.commit()

            # Emit a message to all connected clients indicating the message was deleted
            emit('message_deleted', {'msg_id': message_id}, broadcast=True)
    except ValueError:
        return {'error': 'unable to find message'}, 404
    
@app.patch('/user_workouts/<int:id>')
def update_username(id):
    data = request.get_json()

    if not data:
        return {'error': 'unable to process your input'}, 422
    
    user_workout_to_update = UserWorkout.query.filter_by(id=id).first()

    if not user_workout_to_update:
        return {'error': 'user not found'}, 404   
    
    for attr in data:
        setattr(user_workout_to_update, attr, data[attr])
    db.session.add(user_workout_to_update)
    db.session.commit()
    return user_workout_to_update.to_dict(), 200
    
@app.delete('/user_workouts/<int:id>')
def delete_user_workout(id):
    user_workout_to_delete = UserWorkout.query.filter_by(id=id).first()
    try:
        db.session.delete(user_workout_to_delete)
        db.session.commit()
        return {'message': 'user workout deleted'}, 204
    except LookupError:
        return {'error': 'user workout not found'}, 404
    
@app.delete('/messages/<int:id>')
def delete_message(id):
    message_to_delete = Message.query.filter_by(id=id).first()
    try:
        db.session.delete(message_to_delete)
        db.session.commit()
        return {'message': 'message deleted'}, 204
    except LookupError:
        return {'error': 'message not found'}, 404

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
    socketio.run(app, debug=True, port=5555)