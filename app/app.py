# implementation uses an in-memory data store (data_store dictionary) to manage items. 
# This is a temporary storage mechanism that resets every time the application restarts. 
# It doesn't use SQLite or any other persistent storage mechanism.

from flask import Flask, request, jsonify, abort
from uuid import uuid4
import re

app = Flask(__name__)

data_store = {}

@app.errorhandler(404)
def not_found(error):
    response = jsonify({"description": error.description})
    response.status_code = 404
    return response

@app.errorhandler(400)
def bad_request(error):
    response = jsonify({"description": error.description})
    response.status_code = 400
    return response

def validate_item_data(data, code=400):
    # Check if the required fields are present in the request body
    if not data or 'name' not in data or 'quantity' not in data or 'price' not in data:
        abort(code, description="Invalid input data")

    # Validate name
    if not data['name']:
        abort(code, description="Invalid input data: name cannot be empty")
    if not re.match("^[a-zA-Z0-9 ]*$", data['name']):
        abort(code, description="Invalid input data: name contains special characters")

    # Validate quantity
    if not isinstance(data['quantity'], int):
        abort(code, description="Invalid input data: quantity must be an integer")
    if data['quantity'] < 0:
        abort(code, description="Invalid input data: quantity cannot be negative")
    if data['quantity'] == 0:
        abort(code, description="Invalid input data: quantity cannot be zero")

    # Validate price
    if not isinstance(data['price'], (int, float)):
        abort(code, description="Invalid input data: price must be a number")
    if data['price'] < 0:
        abort(code, description="Invalid input data: price cannot be negative")
    if data['price'] == 0:
        abort(code, description="Invalid input data: price cannot be zero")

@app.route('/items', methods=['POST'])
def create_item():
    # Create a new item in the inventory.
    data = request.get_json()

    validate_item_data(data)

    item_id = str(uuid4())  # Generate a unique ID for the item using UUID4
    new_item = {
        "id": item_id,
        "name": data['name'],
        "quantity": data['quantity'],
        "price": data['price']
    }
    data_store[item_id] = new_item
    return jsonify(new_item), 201

@app.route('/items', methods=['GET'])
def list_items():
    # List all items in the inventory.
    return jsonify(list(data_store.values()))

@app.route('/items/<item_id>', methods=['GET'])
def get_item(item_id):
    # Retrieve an item from the inventory by its ID.
    item = data_store.get(item_id)
    if not item:
        abort(404, description="Item not found")
    return jsonify(item)

@app.route('/items/<item_id>', methods=['PUT'])
def update_item(item_id):
    # Update an existing item in the inventory by its ID.
    data = request.get_json()

    if item_id not in data_store:
        abort(404, description="Item not found")
    
    validate_item_data(data)
    
    updated_item = {
        "id": item_id,
        "name": data['name'],
        "quantity": data['quantity'],
        "price": data['price']
    }
    
    data_store[item_id] = updated_item
    return jsonify(updated_item)

@app.route('/items/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    # Delete an item from the inventory by its ID.
    if item_id not in data_store:
        abort(404, description="Item not found")

    del data_store[item_id]
    return '', 204

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
