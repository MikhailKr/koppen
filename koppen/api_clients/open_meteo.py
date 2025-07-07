import aiohttp
import aiohttp_client_cache
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)


class OpenMeteoAsyncClient:
    def __init__(
        self,
        url="https://api.open-meteo.com/v1/forecast",
        cache_path=".cache",
        expire_after=3600,
        retries=5,
        backoff_factor=0.2,
    ):
        self.url = url
        self.cache_path = cache_path
        self.expire_after = expire_after
        self.retries = retries
        self.backoff_factor = backoff_factor
        self.session = None

    async def __aenter__(self):
        self.session = aiohttp_client_cache.CachedSession(
            cache_name=self.cache_path, expire_after=self.expire_after
        )
        await self.session.__aenter__()
        return self

    async def __aexit__(self, exc_type, exc, tb):
        await self.session.__aexit__(exc_type, exc, tb)

    @retry(
        stop=stop_after_attempt(5),
        wait=wait_exponential(multiplier=0.2, min=0.2, max=5),
        retry=retry_if_exception_type(aiohttp.ClientError),
        reraise=True,
    )
    async def fetch_weather(self, url, params):
        async with self.session.get(self.url, params=params) as response:
            response.raise_for_status()
            return await response.json()
