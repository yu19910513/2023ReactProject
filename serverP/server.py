from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return 'Welcome to my API!'

@app.route('/api/')
def test():
    data = {'message': 'Hello from Flask server!'}
    return jsonify(data)


if __name__ == '__main__':
    app.run(host='localhost', port=3001)
