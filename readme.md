# Inventory Management API

This repository contains the Inventory Management API server and a comprehensive suite of tests for verifying the functionality, correctness, and error handling of a RESTful API. The API server is written using Python and Flask. The tests are written using Python and Pytest.

## Features
- **CRUD Operation Tests**: Ensures the API correctly handles Create, Read, Update, and Delete operations.
- **Positive and Negative Test Cases**: Validates both successful and error scenarios.
- **Parameterized Tests**: Covers multiple data combinations efficiently.
- **Automated Setup and Teardown**: Prepares the test environment and cleans up resources after tests.

---

## Prerequisites

To run the tests, ensure the following are installed:

1. **Python 3.9+**
2. **Docker** and **Docker Compose** (optional, for containerized testing)
3. Required Python packages (install via `requirements.txt`):

```bash
pip install -r requirements.txt
```

---

## Folder Structure

```plaintext
emirates/ #inventory-management-api
├── app/
│   ├── app.py  # The main application file
│   ├── requirements.txt  # the required Python packages
│   ├── tests/  # Main test suite for local testing
│   │   └── test_app.py  # API tests
│   ├── docs/  # OAS schema for Swagger
│   └── ...
├── test-container/
│   ├── Dockerfile  # Dockerfile for building the test runner image
│   ├── docker-compose.yaml
│   ├── tests/  # Main test suite for testing from container
│   │   └── test_app.py  # API tests
│   └── ...
├── Dockerfile  # Dockerfile for building the API image
├── entrypoint.sh
└── ...
```

---
---

## Test Cases Overview

### Positive Test Cases
1. **Create Item**: Verify that valid items can be created successfully.
2. **Get Item**: Retrieve existing items using their unique IDs.
3. **Update Item**: Update properties of existing items.
4. **Delete Item**: Remove items by their IDs.

### Negative Test Cases
1. **Get Nonexistent Item**: Ensure a `404` error is returned for invalid IDs.
2. **Update Nonexistent Item**: Validate proper error handling when updating nonexistent items.
3. **Delete Nonexistent Item**: Confirm that deleting nonexistent items returns a `404` error.
4. **Create Item with Invalid Data**: Test that invalid input data returns appropriate `400` errors.
5. **Update Item with Invalid Data**: Verify error handling when updating items with invalid input.

---

## Running the API server and tests locally
### Prerequisites
1. Install Python and Pip:
   - Download and install Python from [python.org](https://www.python.org/).
   - Ensure Python is installed by running: `python --version` (or `python3 --version`)
   - Ensure Pip is installed by running `pip --version` (or `pip3 --version`) in the command line.
2. Install required packages:
   - Run `pip install -r requirements.txt` to install all necessary packages.

### Usage   
3. Start the API server:
``` bash
   $ python app.py 
```
4. Access the API server and run manual tests:
   - Open Postman/Insomnia or a web browser and navigate to `http://127.0.0.1:5000` to access the application.

5. Run automated tests
``` bash
  $ pytest 
```


## Running the API server and tests inside a container

### Prerequisites
**Install Docker**
  - These tests have been packaged to run with all dependencies
    installed within a Docker container. Due to the use of f-strings,
    this must be run with python 3.6+. The Docker image is based on python 3.10

### Usage
**To run API server open a shell**
1. Build the Docker image
  ```bash
  $ docker build -t inventory-api .
  ```
2. Run the Docker container with API app
  ```bash
  $ docker run -p 5000:5000 inventory-api
  ```

**To run tests open another shell**
3. Switch to `test-container` folder
  ```bash
  $ cd test-container
  ```
4. Build the Docker image for test runner
  ```bash
  $ docker-compose build
  ```
5. Start the container with an interactive shell:
  ```bash
  $ docker-compose run test sh
  ```
**That will drop you into a shell where you can run the tests with standard CLI:**
*Run the entire test suite*
    
  ``` bash
  $ pytest 
  ```

*Run tests while printing all variables and verbose output*

  ``` bash
  $ pytest -vvl
  ```

*Run tests while printing all print statements*

  ``` bash
  $ pytest -s
  ``` 

*To exit the shell*
  ```bash
  $ exit
  ```
  

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

## Setup and Teardown
- **Setup**:
  - Prints a setup message before tests run.
  - Ensures the environment is prepared for testing.
- **Teardown**:
  - Prints a teardown message after tests complete.
  - Deletes all created items using their saved IDs.

---

## Notes
- The tests are parameterized to cover multiple scenarios and data combinations efficiently.
- The API base URL (`BASE_URL`) is configurable to support local and containerized environments.