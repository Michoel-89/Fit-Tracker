from flask_migrate import Migrate
from config import app, db
from models import db

if __name__ == '__main__':
    app.run(debug=True)