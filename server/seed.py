from app import app
from models import db, User, Workout, UserWorkout, Message
from exercises import bodyweight_exercises
from faker import Faker
from random import randint
fake = Faker()

if __name__ == '__main__':
    with app.app_context():
        # for i in bodyweight_exercises:
        #     workout = Workout(
        #         name=i,
        #         body_section=bodyweight_exercises[i]['Body Section'],
        #         description=bodyweight_exercises[i]['Description']
        #     )
        #     db.session.add(workout)
        #     db.session.commit()
        # for i in range(20):
        #     user = User(
        #         username=fake.name(),
        #     )
        #     user._password_hash = '123'
        #     db.session.add(user)
        #     db.session.commit()
        # for i in range(20):
        #     userWorkout = UserWorkout(
        #         workout_count=randint(1, 20),
        #         user_id=randint(1, 5),
        #         workout_id=randint(1, 20)
        #     )
        #     db.session.add(userWorkout)
        #     db.session.commit()
        pass