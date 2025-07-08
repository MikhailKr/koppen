FROM node:20-alpine as frontend-builder

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend/ .

RUN npm run build

FROM python:3.12-slim

WORKDIR /app

COPY --from=frontend-builder /frontend/dist /app/static
# Install pip and uv
RUN pip install --upgrade pip \
    && pip install uv

# Copy pyproject.toml and uv.lock if present
COPY pyproject.toml ./

# Install dependencies using uv
RUN uv pip install --system -e .

# Copy the rest of the application code
COPY koppen/ .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
