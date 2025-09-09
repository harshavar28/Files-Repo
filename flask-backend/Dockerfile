# Use official Python image as base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies (make sure gunicorn is in requirements.txt)
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Render will set $PORT environment variable)
EXPOSE 5000

# Use Gunicorn with dynamic port for Render or other hosting
CMD ["gunicorn", "-b", "0.0.0.0:500", "app:app"]

