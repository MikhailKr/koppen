from fastapi.testclient import TestClient
from koppen.main import app

client = TestClient(app)


def test_base():
    assert 2 == 2
