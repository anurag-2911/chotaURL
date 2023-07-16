export function shortenURLHandler(setError, host, url, setShortUrl) {
  return async () => {
    setError(null);
    try {
      console.log("host value is ", host);
      const response = await fetch(`http://${host}:8080/add/${url}`);
      const shortUrl = await response.text();
      setShortUrl(shortUrl);
    } catch (error) {
      setError("Internal Error", error);
    }
  };
}
