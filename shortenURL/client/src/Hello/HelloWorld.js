import React, { useState } from "react";

function HelloWorld() {
  const [message, setMessage] = useState("");

  async function getHello() {
    try {
      console.log("getHello clicked");
      const response = await fetch(`http://localhost:8080/hello`);
      if (!response.ok) {
        console.log(response);
        // check if HTTP status is in the 200-299 range
        throw new Error("Could not fetch hello message");
      }
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Internal Server Error");
    }
  }

  return (
    <div className="HelloWorld">
      <button onClick={getHello}>GetHello</button>
      <input type="text" value={message} readOnly />
    </div>
  );
}

export default HelloWorld;
