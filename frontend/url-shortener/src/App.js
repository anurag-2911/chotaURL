import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    const response = await fetch(`http://localhost:8080/add/${url}`);
    const shortUrl = await response.text();
    setShortUrl(shortUrl);
  };

  const redirectUrl = async () => {
    setLoading(true);

    try {
      const shortUrlId = shortUrl.split('/').pop();
      const response = await fetch(`http://localhost:8080/get/${shortUrlId}`);

      if (!response.ok) {
        console.error('Error during redirect', response.status);
        return;
      }

      const originalUrl = await response.text();
      console.log('original url is '+originalUrl)
      window.open('http://' + originalUrl, '_blank'); 
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
      {shortUrl && <div>
        <p>Your short URL is: {shortUrl}</p>
        <button onClick={redirectUrl} disabled={loading}>
          {loading ? 'Loading...' : 'Go to URL'}
        </button>
      </div>}
    </div>
  );
}

export default App;
