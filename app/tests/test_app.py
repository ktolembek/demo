import requests
import pytest

BASE_URL = "http://127.0.0.1:5000"
item_ids = []  # Save the item ID to the global array
nonexistent_id = 26885

@pytest.fixture(scope="module", autouse=True)
def setup_and_teardown():
    # Setup: This code runs before any tests
    print("Setting up resources before tests")

    # Yield control to the tests
    yield

    # Teardown: This code runs after all tests
    print("Tearing down resources after tests")
    # clean up any created items
    for item_id in item_ids:
        requests.delete(f"{BASE_URL}/items/{item_id}")

""" 
    Positive Test Cases to test the CRUD operations of the API
"""

@pytest.mark.parametrize("item", [
    {"name": "MacBook Air", "quantity": 5, "price": 999.99},
    {"name": "MacBook Pro", "quantity": 3, "price": 1299.99},
    {"name": "iPad", "quantity": 10, "price": 499.99},
    {"name": "iPhone", "quantity": 7, "price": 799.99},
    {"name": "Apple Watch", "quantity": 15, "price": 399.99},
    {"name": "AirPods", "quantity": 20, "price": 199.99}
])
def test_create_item(item):
    # Given a valid item
    # When I send a POST request to create the item
    # Then the item should be created successfully
    response = requests.post(f"{BASE_URL}/items", json=item)
    assert response.status_code == 201
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")
    data = response.json()
    item_ids.append(data["id"])  # Save the item ID to the global array
    assert data["name"] == item["name"]
    assert data["quantity"] == item["quantity"]
    assert data["price"] == item["price"]

@pytest.mark.parametrize("item_index", [0, 1, 2, 3])
def test_get_item(item_index):
    # Given an existing item ID
    # When I send a GET request to retrieve the item
    # Then the item should be retrieved successfully
    item_id = item_ids[item_index]
    response = requests.get(f"{BASE_URL}/items/{item_id}")
    assert response.status_code == 200
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")

@pytest.mark.parametrize("item_index, updated_item", [
    (0, {"name": "Updated MacBook Air", "quantity": 6, "price": 1099.99}),
    (1, {"name": "Updated MacBook Pro", "quantity": 4, "price": 1399.99}),
    (2, {"name": "Updated iPad", "quantity": 11, "price": 599.99}),
    (3, {"name": "Updated iPhone", "quantity": 8, "price": 899.99})
])
def test_update_item(item_index, updated_item):
    # Given an existing item ID
    # When I send a PUT request to update the item
    # Then the item should be updated successfully
    item_id = item_ids[item_index]
    response = requests.put(f"{BASE_URL}/items/{item_id}", json=updated_item)
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")
    assert response.status_code == 200

@pytest.mark.parametrize("item_index", [4, 5])
def test_delete_item(item_index):
    # Given an existing item ID
    # When I send a DELETE request to delete the item
    # Then the item should be deleted successfully
    item_id = item_ids[item_index]
    response = requests.delete(f"{BASE_URL}/items/{item_id}")
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")
    assert response.status_code == 204

"""
    Negative Test Cases to test the error handling of the API 
"""

def test_get_nonexistent_item():
    # Given a non-existent item ID
    # When I send a GET request to retrieve the item
    # Then a 404 error should be returned
    response = requests.get(f"{BASE_URL}/items/{nonexistent_id}")
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")
    assert response.status_code == 404
    data = response.json()
    assert data["description"] == "Item not found"
    
def test_update_nonexistent_item():
    # Given a non-existent item ID
    # When I send a PUT request to update the item
    # Then a 404 error should be returned
    response = requests.put(f"{BASE_URL}/items/{nonexistent_id}", json={
        "name": "Nonexistent Item",
        "quantity": 0,
        "price": 0.00
    })
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")
    assert response.status_code == 404
    data = response.json()
    assert data["description"] == "Item not found"

def test_delete_nonexistent_item():
    # Given a non-existent item ID
    # When I send a DELETE request to delete the item
    # Then a 404 error should be returned
    response = requests.delete(f"{BASE_URL}/items/{nonexistent_id}")
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")
    assert response.status_code == 404
    data = response.json()
    assert data["description"] == "Item not found"

# Create item with invalid data
@pytest.mark.parametrize("invalid_item, error_message", [
    ({"name": "Invalid@Item", "quantity": 1, "price": 100.00}, "Invalid input data: name contains special characters"),  # Special characters in name
    ({"name": "Invalid Item", "quantity": "one", "price": 100.00}, "Invalid input data: quantity must be an integer"),  # Quantity is not an integer
    ({"name": "Invalid Item", "quantity": "", "price": 100.00}, "Invalid input data: quantity must be an integer"),  # Quantity is an empty string
    ({"name": "Invalid Item", "quantity": 1, "price": "one hundred"}, "Invalid input data: price must be a number"),  # Price is not a number
    ({"name": "Invalid Item", "quantity": 1, "price": ""}, "Invalid input data: price must be a number"),   # Price is an empty string
    ({"name": "Invalid Item", "quantity": -1, "price": 100.00}, "Invalid input data: quantity cannot be negative"),  # Negative quantity
    ({"name": "Invalid Item", "quantity": 1, "price": -100.00}, "Invalid input data: price cannot be negative"),  # Negative price
    ({"name": "", "quantity": 1, "price": 100.00}, "Invalid input data: name cannot be empty"),  # Empty name
    ({"name": "Invalid Item", "quantity": 1, "price": 0.00}, "Invalid input data: price cannot be zero"),  # Zero price
    ({"name": "Invalid Item", "quantity": 0, "price": 100.00}, "Invalid input data: quantity cannot be zero"),  # Zero quantity
    ({"quantity": 1, "price": 100.00}, "Invalid input data"),  # Missing name
    ({"name": "Invalid Item", "price": 100.00}, "Invalid input data"),  # Missing quantity
    ({"name": "Invalid Item", "quantity": 1}, "Invalid input data")  # Missing price
])
def test_create_item_invalid_data(invalid_item, error_message):
    # Given invalid item data
    # When I send a POST request to create the item
    # Then a 400 error should be returned with the appropriate error message
    response = requests.post(f"{BASE_URL}/items", json=invalid_item)
    assert response.status_code == 400
    data = response.json()
    assert data["description"] == error_message
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")

# Update item with invalid data
# In open box testing we don't need to test all the invalid data combinations since we have already tested them in the create item test. 
# They use the same validation logic, validate_item_data(data) function.
@pytest.mark.parametrize("item_index, invalid_item, error_message", [
    (0, {"name": "Invalid@Item", "quantity": 1, "price": 100.00}, "Invalid input data: name contains special characters"),  # Special characters in name
    (1, {"name": "Invalid Item", "quantity": "one", "price": 100.00}, "Invalid input data: quantity must be an integer"),  # Quantity is not an integer
    (2, {"name": "Invalid Item", "quantity": None, "price": 100.00}, "Invalid input data: quantity must be an integer"),  # Quantity is None
    (3, {"name": "Invalid Item", "quantity": 1, "price": "one hundred"}, "Invalid input data: price must be a number"),  # Price is not a number
    (0, {"name": "Invalid Item", "quantity": 1, "price": None}, "Invalid input data: price must be a number"),   # Price is None
    (1, {"name": "Invalid Item", "quantity": -1, "price": 100.00}, "Invalid input data: quantity cannot be negative"),  # Negative quantity
    (2, {"name": "Invalid Item", "quantity": 1, "price": -100.00}, "Invalid input data: price cannot be negative"),  # Negative price
    (3, {"name": "", "quantity": 1, "price": 100.00}, "Invalid input data: name cannot be empty"),  # Empty name
    (0, {"quantity": 1, "price": 100.00}, "Invalid input data"),  # Missing name
    (1, {"name": "Invalid Item", "price": 100.00}, "Invalid input data"),  # Missing quantity
    (2, {"name": "Invalid Item", "quantity": 1}, "Invalid input data")  # Missing price
])
def test_update_item_invalid_data(item_index, invalid_item, error_message):
    # Given an existing item ID and invalid item data
    # When I send a PUT request to update the item
    # Then a 400 error should be returned with the appropriate error message
    item_id = item_ids[item_index]
    response = requests.put(f"{BASE_URL}/items/{item_id}", json=invalid_item)
    assert response.status_code == 400
    data = response.json()
    assert data["description"] == error_message
    print(f"Response status code: {response.status_code}")
    print(f"Response content: {response.text}")