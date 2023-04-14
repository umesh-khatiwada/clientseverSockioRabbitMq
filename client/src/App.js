import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:3002");
  useEffect(() => {
    socket.on("message", (data) => {
      handleMessage(data);
    });
  }, []);

  function handleMessage(data) {
    if (messages.length >= 20) {
      console.log("inside length 20 ");
      setMessages(messages.splice(0, 1));
      messages.push(data?.message);
    } else {
      if (messages.includes(data?.message)) {
      } else {
        messages.push(data?.message);
      }
    }
    setMessages([...messages]);
  }

  return (
    <div className="App">
      <h2>Priority Messages</h2>
      <div className="card mx-2 mt-2">
        {messages?.length > 0 &&
          messages.map((message, i) => <p key={i}>{message}</p>)}
      </div>
    </div>
  );
}

export default App;
