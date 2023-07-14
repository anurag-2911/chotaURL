import React, { useState } from "react";
import "./App.css";
import HelloWorld from './Hello/HelloWorld';

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/add/${url}`);
      const shortUrl = await response.text();
      setShortUrl(shortUrl);
    } catch (error) {
      setError("Internal Error");
    }
  };

  const redirectUrl = async () => {
    setLoading(true);
    setError(null);

    try {
      const shortUrlId = shortUrl.split("/").pop();
      const response = await fetch(`http://localhost:8080/get/${shortUrlId}`);

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

  return (
    <div className="layout">
      <div className="navigation">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
      <div className="main-content">
        <div>
          <h1>URL Shortener</h1>
          <input
            type="text"
            placeholder="Enter URL to shorten"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
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
        </div>
        <br/>
        <div>
          <HelloWorld />
        </div>
      </div>
      <div className="info-area">
        <h2>URL Shortener Service</h2>
        <p>Additional information can be displayed here.</p>
      </div>
    </div>
  );
}

export default App;
