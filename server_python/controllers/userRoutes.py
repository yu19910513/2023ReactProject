##CURRENTLY NOT IN USE
from flask import jsonify, request #import reuqest to allow HTTP request to flow in
from models.user import db, User #import Base containing all models e.g. User
from config.connection import engine #engine to connect with MySQL database
from . import controllers



# app.register_blueprint(my_routes)
@controllers.route('/users', methods=['GET'])
def get_users():
     users = User.query.all()
     return jsonify({'users': [user.serialize for user in users]})

@controllers.route('/api/user/signUp', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(**data)# *=unpack list or linear array; **=unpack objects
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize)

@controllers.route('/')
def home():
    return 'Welcome to my API!'


@controllers.route('/api/')
def test():
    data = {'message': 'Hello from Flask server!'}
    return jsonify(data)
