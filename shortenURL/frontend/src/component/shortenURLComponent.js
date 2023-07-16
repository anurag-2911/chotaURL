import React from "react";

export function shortenURLComponent(url, setUrl, shortenUrl, shortUrl, redirectUrl, loading, error) {
  return <div>
    <h1>URL Shortener</h1>
    <input
      type="text"
      placeholder="Enter URL to shorten"
      value={url}
      onChange={(e) => setUrl(e.target.value)} />
    <button onClick={shortenUrl}>Shorten</button>
    {shortUrl && (
      <div>
        <p>Your short URL is: {shortUrl}</p>
        <button onClick={redirectUrl} disabled={loading}>
          {loading ? "Loading..." : "Go to URL"}
        </button>
      </div>
    )}
    {error && <p>{error}</p>}
  </div>;
}
