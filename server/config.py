from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_socketio import SocketIO, emit
load_dotenv()
import psycopg2
import os
print('current directory',os.getcwd())
app = Flask(__name__, static_url_path='', static_folder='../client/build', template_folder='../client/build')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('db_url')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.getenv('session_key')

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins="https://fit-tracker-g614.onrender.com")
CORS(app, resources={r"/*":{"origins":['https://fit-tracker-g614.onrender.com']}})