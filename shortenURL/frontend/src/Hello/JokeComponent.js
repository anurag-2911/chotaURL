import React, { useState, useEffect, useRef } from 'react';

function Joke() {
  const [joke, setJoke] = useState("");
  const [fetching, setFetching] = useState(false);
  const intervalId = useRef(null);

  const fetchJoke = async () => {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    setJoke(`${data.setup} - ${data.punchline}`);
  };

  const handleButtonClick = () => {
    if (fetching) {
      clearInterval(intervalId.current);
    } else {
      fetchJoke();
      intervalId.current = setInterval(fetchJoke, 10000);  // Fetch new joke every 10 seconds
    }
    setFetching(!fetching);
  };

  useEffect(() => {
    return () => {
      // Cleanup interval on component unmount
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return (
    <div>
      <button onClick={handleButtonClick}>{fetching ? "Stop" : "Get Joke"}</button>
      <textarea readOnly value={joke} style={{width: "80%", height: "20vh"}} />
    </div>
  );
}

export default Joke;
