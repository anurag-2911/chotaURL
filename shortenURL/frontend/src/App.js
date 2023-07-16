import React, { useState } from "react";
import "./App.css";
import HelloWorld from "./Hello/HelloWorld";
import JokeComponent from "./Hello/JokeComponent";
import { navigationBar } from "./component/navigationBar";
import { infoArea } from "./component/infoArea";
import { shortenURLHandler } from "./handlers/shortenURLHandler";
import { redirectURLHandler } from "./handlers/redirectURLHandler";
import { shortenURLComponent } from "./component/shortenURLComponent";

function App() {
  const host = process.env.REACT_APP_BACKEND_HOST;
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = shortenURLHandler(setError, host, url, setShortUrl);

  const redirectUrl = redirectURLHandler(setLoading, setError, shortUrl, host);

  return (
    <div className="layout">
      {navigationBar()}
      <div className="main-content">
        {shortenURLComponent(
          url,
          setUrl,
          shortenUrl,
          shortUrl,
          redirectUrl,
          loading,
          error
        )}
        <br />
        <div>
          <HelloWorld />
        </div>
        <br />
        <div>
          <JokeComponent />
        </div>
      </div>
      {infoArea()}
    </div>
  );
}

export default App;
