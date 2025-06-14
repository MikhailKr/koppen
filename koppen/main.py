from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import database

app = FastAPI()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Hellooooo, World!"}

@app.get("/db-test")
def test_db(db: Session = Depends(get_db)):
    try:
        # Try to execute a simple query
        db.execute("SELECT 1")
        return {"message": "Successfully connected to the database!"}
    except Exception as e:
        return {"error": f"Database connection failed: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

