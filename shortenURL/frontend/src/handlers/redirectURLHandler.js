export function redirectURLHandler(setLoading, setError, shortUrl, host) {
  return async () => {
    setLoading(true);
    setError(null);

    try {
      const shortUrlId = shortUrl.split("/").pop();
      const response = await fetch(`http://${host}:8080/get/${shortUrlId}`);

      if (!response.ok) {
        console.error("Error during redirect", response.status);
        return;
      }

      const originalUrl = await response.text();
      console.log("original url is " + originalUrl);
      window.open("http://" + originalUrl, "_blank");
    } catch (error) {
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
}
