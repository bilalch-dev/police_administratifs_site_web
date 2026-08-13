# ==========================================================================
# BACKEND DOCKERFILE - Police Administrative Flask API
# Base Image: Python 3.11 Alpine
# ==========================================================================

FROM python:3.11-alpine

WORKDIR /app

# Install system build dependencies for psycopg2/C libraries
RUN apk add --no-cache gcc musl-dev postgresql-dev libffi-dev

# Copy requirements & install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# Expose API port 5000
EXPOSE 5000

# Run Flask using production Gunicorn WSGI server
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
