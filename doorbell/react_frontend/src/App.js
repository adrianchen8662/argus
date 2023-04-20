import "./App.css";
import { useState } from "react";
import Header from "./Header";

function App() {
  const [address, setAddress] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/jsonexample", {
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
    <>
      <Header />
      <div id="setupFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="formOptionContainer">
            <span className="formOptionLabel">Address</span>
            <input
              type="text"
              value={address}
              placeholder="127.0.0.0"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="formOptionContainer">
            <span className="formOptionLabel">Port</span>
            <input
            type="text"
            value={port}
            placeholder="3000"
            onChange={(e) => setPort(e.target.value)}
            required
          />
          </div>
          <div className="formOptionContainer">
            <span className="formOptionLabel">Password</span>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">C R E A T E</button>
        </form>
      </div>
      <div className={`${message ? "message" : "no_message"}`} >{message ? <p>{message}</p> : null}</div>
    </>
  );
}

export default App;