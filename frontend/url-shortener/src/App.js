import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async () => {
    const response = await fetch(`http://localhost:5555/add/${url}`);
    const shortUrl = await response.text();
    setShortUrl(shortUrl);
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <input 
        type="text"
        placeholder="Enter URL to shorten"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <button onClick={shortenUrl}>Shorten</button>
      {shortUrl && <p>Your short URL is: {shortUrl}</p>}
    </div>
  );
}

export default App;
