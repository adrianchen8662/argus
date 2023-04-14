import "./App.css";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:5000/jsonexample", {
        method: "POST",
        body: JSON.stringify({
          address: address,
          port: port,
          password: password,
        }),
      });
      if (res.status === 200) {
        setAddress("");
        setPort("");
        setPassword("");
        setMessage("Settings Successfully Changed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          placeholder="Address/Domain"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          value={port}
          placeholder="Port"
          onChange={(e) => setPort(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;