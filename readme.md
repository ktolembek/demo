# Inventory Management API

This repository contains the **Inventory Management API** built using Python and Flask, along with an extensive test suite to validate its functionality and robustness. Tests are implemented in both Python (using Pytest) and JavaScript (using Supertest.js) for flexible and versatile validation.

---

## Features

- **CRUD Operations**: Full support for Create, Read, Update, and Delete functionalities.
- **Positive and Negative Test Cases**: Validates both success and error-handling scenarios.
- **Parameterized Tests**: Ensures extensive coverage with varied data inputs.
- **Setup and Teardown**: Automated preparation and cleanup for consistent test environments.
- **Docker Integration**: Easy-to-use containerized environments for testing.

---

## Prerequisites

To run the tests, ensure the following are installed:

1. **Python 3.9+**
2. **Docker** and **Docker Compose** (optional, for containerized testing)
3. Clone this repository:
```bash
git clone https://github.com/ktolembek/emirates.git
```
4. Required Python packages (install via `requirements.txt`):

```bash
pip install -r requirements.txt
```
5. **Node.js v14+** (optional, for Supertest.JS and Playwright testing)
---

## Folder Structure

```plaintext
emirates/
├── app/
│   ├── app.py              # API application
│   ├── requirements.txt    # Python dependencies
│   ├── tests/              # Pytest test cases
│   ├── docs/               # Swagger/OpenAPI documentation
│   └── ...
├── test-container/
│   ├── Dockerfile          # Docker image for test runner
│   ├── docker-compose.yaml # Docker setup for tests
│   ├── tests/              # Containerized Pytest cases
├── Dockerfile              # Docker image for the API server
├── entrypoint.sh           # Entrypoint for the API container
├── supertest/              # Supertest.js test cases
│   ├── api.test.js
│   ├── package.json
└── ...
```

## Video Explanation

For a detailed walkthrough of the Inventory Management API, including setup, usage, and test execution, please refer to the following video:

[Video Explanation](https://drive.google.com/file/d/1Lj3mWW2PawsPhDbefxLtwBzktLKeu3gq/view?usp=sharing)

This video covers:
- Overview of the API features
- Step-by-step guide to running the API server and tests

---
---

## Running Locally
### Prerequisites
1. Install Python and Pip:
   - Download and install Python from [python.org](https://www.python.org/).
   - Ensure Python is installed by running: `python --version` (or `python3 --version`)
   - Ensure Pip is installed by running `pip --version` (or `pip3 --version`) in the command line.
2. Install required packages:
   - Run `pip install -r requirements.txt` to install all necessary packages.

### Start the API Server
```bash
python app.py
```

Access the server at [http://127.0.0.1:5000](http://127.0.0.1:5000).

### Run Tests Locally

#### Using Pytest
```bash
pytest
```

### Using other frameworks

**Supertest.js**
```bash
cd supertest
npm install
npm test # Run tests
```

**Playwright**
```bash
cd playwright
npm install
npx playwright install
npx playwright test # Run tests
npx playwright show-report  # View reports
```
---

## Running in Docker

### Build and Run API Server
```bash
docker build -t inventory-api .
docker run -p 5000:5000 inventory-api
```

### Run Tests in Docker
```bash
cd test-container
docker-compose build
docker-compose run test sh
```

**That will drop you into a shell where you can run the tests with standard CLI:**

*Run the entire test suite*
``` bash
pytest 
```

*Run tests with verbose output*
``` bash
pytest -vvl
```

*To exit the shell*
```bash
exit
```

---


## API Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/items`         | Create a new item      |
| GET    | `/items/:id`     | Retrieve an item       |
| GET    | `/items`         |  List all items        |
| PUT    | `/items/:id`     | Update an existing item|
| DELETE | `/items/:id`     | Delete an item         |

---

## Test Cases

### Positive Tests
1. **Create Item**: Successfully create items.
2. **Get Item**: Retrieve items by ID.
3. **Update Item**: Modify existing items.
4. **Delete Item**: Remove items.

### Negative Tests
1. **Invalid Retrieval**: Access non-existent items.
2. **Invalid Updates**: Modify non-existent or invalid items.
3. **Invalid Deletions**: Attempt to delete non-existent items.
4. **Invalid Input**: Ensure input validation for all endpoints.

---

## Notes

- The API uses an in-memory datastore that resets on restart.
- Authentication and authorization are not implemented for simplicity.
- Swagger documentation is available in the `docs/` folder.
- Both BDD and TDD styles are supported, but not implemented to avoid additional dependencies and complexity.


---
---

# API Test Cases Documentation

## Overview
This document provides an overview of the test cases implemented to test the CRUD operations and error handling of an API. The tests are written in Python using Pytest and focus on verifying the API's correctness, handling of edge cases, and error conditions.

---

## Positive Test Cases

### **1. Create Item**
- **Description**: Verify that valid items can be created successfully.
- **Input Data**:
  - Examples:
    - `{ "name": "MacBook Air", "quantity": 5, "price": 999.99 }`
    - `{ "name": "MacBook Pro", "quantity": 3, "price": 1299.99 }`
- **Steps**:
  1. Send a `POST` request to the `/items` endpoint with valid data.
  2. Verify that the response status code is `201`.
  3. Check that the response body contains the correct data.
  4. Save the returned item ID for future use.
- **Expected Outcome**: The item is created successfully, and the response matches the input data.

### **2. Get Item**
- **Description**: Verify that an existing item can be retrieved successfully.
- **Input Data**: Existing item IDs.
- **Steps**:
  1. Send a `GET` request to `/items/{id}` for each saved item ID.
  2. Verify that the response status code is `200`.
  3. Check that the returned data matches the created item.
- **Expected Outcome**: The item is retrieved successfully.

### **3. Update Item**
- **Description**: Verify that an existing item can be updated successfully.
- **Input Data**:
  - Existing item IDs.
  - Updated item data (e.g., `{ "name": "Updated MacBook Air", "quantity": 6, "price": 1099.99 }`).
- **Steps**:
  1. Send a `PUT` request to `/items/{id}` with updated data.
  2. Verify that the response status code is `200`.
  3. Check that the item is updated correctly in the response.
- **Expected Outcome**: The item is updated successfully.

### **4. Delete Item**
- **Description**: Verify that an existing item can be deleted successfully.
- **Input Data**: Existing item IDs.
- **Steps**:
  1. Send a `DELETE` request to `/items/{id}`.
  2. Verify that the response status code is `204`.
- **Expected Outcome**: The item is deleted successfully, and subsequent requests for the item return `404`.

---

## Negative Test Cases

### **1. Get Nonexistent Item**
- **Description**: Verify that requesting a nonexistent item returns a `404` error.
- **Input Data**: Invalid item ID (e.g., `26885`).
- **Steps**:
  1. Send a `GET` request to `/items/{nonexistent_id}`.
  2. Verify that the response status code is `404`.
  3. Check that the response body contains the error message "Item not found".
- **Expected Outcome**: The API returns a `404` error with an appropriate message.

### **2. Update Nonexistent Item**
- **Description**: Verify that updating a nonexistent item returns a `404` error.
- **Input Data**:
  - Invalid item ID.
  - Updated data (e.g., `{ "name": "Nonexistent Item", "quantity": 0, "price": 0.00 }`).
- **Steps**:
  1. Send a `PUT` request to `/items/{nonexistent_id}`.
  2. Verify that the response status code is `404`.
  3. Check that the response body contains the error message "Item not found".
- **Expected Outcome**: The API returns a `404` error with an appropriate message.

### **3. Delete Nonexistent Item**
- **Description**: Verify that deleting a nonexistent item returns a `404` error.
- **Input Data**: Invalid item ID.
- **Steps**:
  1. Send a `DELETE` request to `/items/{nonexistent_id}`.
  2. Verify that the response status code is `404`.
  3. Check that the response body contains the error message "Item not found".
- **Expected Outcome**: The API returns a `404` error with an appropriate message.

### **4. Create Item with Invalid Data**
- **Description**: Verify that creating an item with invalid data returns a `400` error.
- **Input Data**:
  - Examples:
    - Missing fields (e.g., `{ "quantity": 1, "price": 100.00 }`).
    - Invalid values (e.g., `{ "name": "", "quantity": -1, "price": -100.00 }`).
- **Steps**:
  1. Send a `POST` request to `/items` with invalid data.
  2. Verify that the response status code is `400`.
  3. Check that the error message matches the validation failure.
- **Expected Outcome**: The API returns a `400` error with an appropriate validation message.

### **5. Update Item with Invalid Data**
- **Description**: Verify that updating an item with invalid data returns a `400` error.
- **Input Data**:
  - Examples:
    - Invalid values (e.g., `{ "name": "", "quantity": -1, "price": -100.00 }`).
- **Steps**:
  1. Send a `PUT` request to `/items/{id}` with invalid data.
  2. Verify that the response status code is `400`.
  3. Check that the error message matches the validation failure.
- **Expected Outcome**: The API returns a `400` error with an appropriate validation message.

---