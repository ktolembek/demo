#!/bin/sh

# Start the Flask app in the background
python app.py &

# Wait for the server to start
sleep 5

# Run the tests
pytest -vvl

# Keep the container running
tail -f /dev/null