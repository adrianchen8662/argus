import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header";

function App() {
  const [address, setAddress] = useState("");
  const [port, setPort] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [logView, setLogView] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logs, setLogs] = useState(null);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/setconnectsettings", {
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

  let handleSwitch = () => {
    setLogView(!logView);
  }


  useEffect(() => {
    setLogsLoading(true);
    try {
      fetch("http://127.0.0.1:5000/getstatuslogs", {
        method: "GET"
      })
      .then((res) => res.json())
      .then((resJSON) => {
          console.log("HELLO");
          setLogsLoading(false);
          setLogs(<pre>{resJSON}</pre>);
      });
    } catch (err) {
      setLogsLoading(false);
      console.log(err);
    }
  }, [])


  return (
    <>
      <Header />
      <div id="setupFormContainer">
      { !logView &&
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
        }
        {logView &&
          <div className="logs">
            <div className="logHeaderContainer">
              <span className="logHeader">L O G S</span>
            </div>
            {logs}
            {logsLoading && "LOADING"}
              
          </div>
        }
      </div>
      <div className={`${message ? "message" : "no_message"}`} >{message ? <p>{message}</p> : null}</div>
      <div className="switchView" onClick={handleSwitch}>
        <span className="switchViewSpan">
          {logView ? "< Setup"  : "Logs >"}
        </span>
      </div>
    </>
  );
}

export default App;