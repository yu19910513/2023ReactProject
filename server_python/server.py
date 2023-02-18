from typing import List, Type
from flask import Flask, jsonify, request #import reuqest to allow HTTP request to flow in
from flask_cors import CORS #allow cross-origin access
from sqlalchemy.orm import sessionmaker
from models.user import Base, User #import Base containing all models e.g. User
from config.connection import engine #engine to connect with MySQL database


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
Session = sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(engine)


@app.route('/users', methods=['GET'])
def get_users() -> dict[str, List[Type[User]]]:
     users = session.query(User).all()
     return jsonify({'users': [user.serialize for user in users]})

@app.route('/api/user/signUp', methods=['POST'])
def create_user() -> str:
    data = request.get_json()
    user = User(**data)# *=unpack list or linear array; **=unpack objects
    session.add(user)
    session.commit()
    return jsonify(user.serialize)

@app.route('/')
def home():
    return 'Welcome to my API!'


@app.route('/api/')
def test():
    data = {'message': 'Hello from Flask server!'}
    return jsonify(data)


if __name__ == '__main__':
    app.run(host='localhost', port=3001, debug=True)
