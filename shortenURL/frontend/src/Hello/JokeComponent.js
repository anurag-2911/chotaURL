import React, { useState, useEffect } from "react";

const JokeComponent = () => {
  const [joke, setJoke] = useState("");

  const fetchJoke = async () => {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    setJoke(`${data.setup} - ${data.punchline}`);
  };

  useEffect(() => {
    fetchJoke(); // Fetch a joke on component mount
  }, []);

  return (
    <div>
      <button onClick={fetchJoke}>Get Joke</button>
      <textarea readOnly value={joke} style={{width: "80%", height: "20vh"}} />
    </div>
  );
};

export default JokeComponent;
