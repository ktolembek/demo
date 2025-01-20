# Inventory Management API

# Running the API server and tests inside a container

## Prerequisites
**Install Docker**
  - These tests have been packaged to run with all dependencies
    installed within a Docker container. Due to the use of f-strings,
    this must be run with python 3.6+. The Docker image is based on python 3.10

## Usage
**To run API server open a shell**
Build the Docker image
  ```bash
  $ docker build -t inventory-api .
  ```
Run the Docker container with API app
  ```bash
  $ docker run -p 5000:5000 inventory-api
  ```

**To run tests open another shell**
Switch to `test-container` folder
  ```bash
  $ cd test-container
  ```
Build the Docker image for tests
  ```bash
  $ docker-compose build
  ```
Run  the Docker container with tests
  ```bash
  $ docker-compose run test sh
  ```
That will drop you into a shell where you can run the tests with standard CLI

**This will open the docker shell and you can run one of the following commands:**
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

**To exit the shell**
  ```bash
  $ exit
  ```

**Use the provided endpoints to test the application's functionality manually with**
```
   - Postman
   - Insomnia
``` 

# Running the API server and tests in your system
## Prerequisites
1. Install Python and Pip:
   - Download and install Python from [python.org](https://www.python.org/).
   - Ensure Python is installed by running: `python --version` (or `python3 --version`)
   - Ensure Pip is installed by running `pip --version` (or `pip3 --version`) in the command line.
2. Install required packages:
   - Run `pip install -r requirements.txt` to install all necessary packages.

## Usage   
3. Start the API server:
``` bash
   $ python app.py 
```
4. Access the application:
   - Open a web browser or Postman and navigate to `http://127.0.0.1:5000` to access the application.

5. Test the application
``` bash
  $ pytest 
```
  