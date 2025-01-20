# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all necessary files into the image (if needed)
COPY . .

# Default command
CMD ["pytest"]