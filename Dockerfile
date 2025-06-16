FROM python:3.12-slim

WORKDIR /app

# Install pip and uv
RUN pip install --upgrade pip \
    && pip install uv

# Copy pyproject.toml and uv.lock if present
COPY pyproject.toml ./

# Install dependencies using uv
RUN uv pip install --system -e .

# Copy the rest of the application code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "koppen.main:app", "--host", "0.0.0.0", "--port", "8000"]
