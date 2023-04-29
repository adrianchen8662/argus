/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint react/destructuring-assignment: 0 */

import "./SetupArea.css";
import React from "react";
import { Areas, apiHost, getConnVals } from "../constants";



class SetupArea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setCfaceAddr = this.setCfaceAddr.bind(this);
    this.setCfacePort = this.setCfacePort.bind(this);
    this.setCfacePass = this.setCfacePass.bind(this);
    this.setDbellAddr = this.setDbellAddr.bind(this);
    this.setDbellPort = this.setDbellPort.bind(this);
    this.setDbellPass = this.setDbellPass.bind(this);
    this.setDbaseAddr = this.setDbaseAddr.bind(this);
    this.setDbasePort = this.setDbasePort.bind(this);
    this.switchToCompreface = this.switchToCompreface.bind(this);
    this.switchToDoorbell = this.switchToDoorbell.bind(this);
    this.switchToDatabase = this.switchToDatabase.bind(this);
    this.handleCfacePost = this.handleCfacePost.bind(this);
    this.handleDbellPost = this.handleDbellPost.bind(this);
    this.handleDbasePost = this.handleDbasePost.bind(this);

    this.state = {
      currentView: "Doorbell",
      // connStatus: false,
      cfaceConn: false,
      dbaseConn: false,
      dbellConn: false,
      cfaceAddr: "",
      cfacePort: "",
      cfacePass: "",
      dbellAddr: "",
      dbellPort: "",
      dbellPass: "",
      dbaseHost: "",
      dbasePort: "",
    }
  }

  componentDidMount() {
    try {
      fetch(`${apiHost}/getstatus`, {
        method: "GET"
      }).then((res) => 
      {
        if(res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then((resJSON) => {
        if(resJSON){
          // this.setState({connStatus: true});
          this.setState({
            cfaceConn: resJSON.Compreface,
            dbaseConn: resJSON.Database,
            dbellConn: resJSON.Doorbell,
          })
          console.log(resJSON)
          console.log(connVals)
        }
      
    });
    } catch (err) {
      console.log(err);
      this.props.changeArea(Areas.setup_area)
    }
  }

  handleCfacePost(e) {
    const {cfaceAddr, cfacePort, cfacePass} = this.state; 
    e.preventDefault();
    try {
      fetch(`${apiHost}/postcomprefacesettings?address=${cfaceAddr}&port=${cfacePort}&api_key=${cfacePass}`, {
        method: "POST"
      }).then();
    } catch (err) {
      console.err(err);
    }
  }

  handleDbellPost(e) {
    const {dbellAddr, dbellPort, dbellPass} = this.state; 
    e.preventDefault();
    try {
      fetch(`${apiHost}/postdoorbellsettings?address=${dbellAddr}&port=${dbellPort}&password=${dbellPass}`, {
        method: "POST"
      }).then();
    } catch (err) {
      console.err(err);
    }
  }

  handleDbasePost(e) {
    const {dbaseHost, dbasePort } = this.state; 
    e.preventDefault();
    try {
      fetch(`${apiHost}/postdatabasesettings?address=${dbaseHost}&port=${dbasePort}`, {
        method: "POST"
      }).then();
    } catch (err) {
      console.err(err);
    }
  }
  
  setCfaceAddr(e) {
    this.setState({
      cfaceAddr: e.target.value
    })
  }

  setCfacePort(e) {
    this.setState({
      cfacePort: e.target.value
    })
  }

  setCfacePass(e) {
    this.setState({
      cfacePass: e.target.value
    })
  }

  setDbellAddr(e) {
    this.setState({
      dbellAddr: e.target.value
    })
  }

  setDbellPort(e) {
    this.setState({
      dbellPort: e.target.value
    })
  }

  setDbellPass(e) {
    this.setState({
      dbellPass: e.target.value
    })
  }
  
  setDbaseAddr(e) {
    this.setState({
      dbaseHost: e.target.value
    })
  }

  setDbasePort(e) {
    this.setState({
      dbasePort: e.target.value
    })
  }

  switchToCompreface() {
    this.setState({
      currentView: "Compreface"
    })
  }

  switchToDoorbell() {
    this.setState({
      currentView: "Doorbell"
    })
  }

  switchToDatabase() {
    this.setState({
      currentView: "Database"
    })
  }

  

  render() {
    const { currentView, cfaceConn, dbaseConn, dbellConn, cfaceAddr, cfacePort, cfacePass, dbellAddr, dbellPort, dbellPass, dbaseHost, dbasePort} = this.state;
    return (
      <div id="setupArea">
        <div className="memberFramesContainer movingIn">
          <div className="setupHeader">
            <div className="backButtonContainer"  onClick={this.switchToCompreface}>
              <span className="backButtonHelp">compreface</span>
            </div>
            <div className="backButtonContainer"  onClick={this.switchToDoorbell}>
              <span className="backButtonHelp">doorbell</span>
            </div>
            <div className="backButtonContainer"  onClick={this.switchToDatabase}>
              <span className="backButtonHelp">database</span>
            </div>

          </div>
          <div id="setupContainer">
            { currentView === "Compreface" &&
              <div className="setupFormContainer">
              <span className="setupFormHeader">Compreface Setup</span>
              <span className={`setupFormSubHeader ${cfaceConn ? "good": "bad"}`}>{!cfaceConn && "Not "}Connected</span>
              <form onSubmit={this.handleCfacePost}>
              <div className="formOptionContainer">
                <span className="formOptionLabel">Address</span>
                <input
                  type="text"
                  value={cfaceAddr}
                  placeholder="127.0.0.0"
                  onChange={(e) => this.setCfaceAddr(e)}
                  required
                />
              </div>
              <div className="formOptionContainer">
                <span className="formOptionLabel">Port</span>
                <input
                  type="text"
                  value={cfacePort}
                  placeholder="8001"
                  onChange={this.setCfacePort}
                  required
                />
              </div>
              <div className="formOptionContainer">
                <span className="formOptionLabel">Password</span>
                <input
                  type="password"
                  value={cfacePass}
                  placeholder="password"
                  onChange={this.setCfacePass}
                  required
                />
              </div> 
                <button type="submit">S U B M I T</button>
              </form>  
            </div> }
            { currentView === "Doorbell" &&
            <div className="setupFormContainer">
              <span className="setupFormHeader">Doorbell Setup</span>
              <span className={`setupFormSubHeader ${dbellConn ? "good": "bad"}`}>{!dbellConn && "Not "}Connected</span>
              <form onSubmit={this.handleDbellPost}>
              <div className="formOptionContainer">
                <span className="formOptionLabel">Address</span>
                <input
                  type="text"
                  value={dbellAddr}
                  placeholder="127.0.0.0"
                  onChange={this.setDbellAddr}
                  required
                />
              </div>
              <div className="formOptionContainer">
                <span className="formOptionLabel">Port</span>
                <input
                  type="text"
                  value={dbellPort}
                  placeholder="8001"
                  onChange={this.setDbellPort}
                  required
                />
              </div>
              <div className="formOptionContainer">
                <span className="formOptionLabel">Password</span>
                <input
                  type="password"
                  value={dbellPass}
                  placeholder="password"
                  onChange={this.setDbellPass}
                  required
                />
              </div> 
                <button type="submit">S U B M I T</button>
              </form>  
            </div>}
            { currentView === "Database" &&
            <div className="setupFormContainer">
              <span className="setupFormHeader">Database Setup</span>
              <span className={`setupFormSubHeader ${dbaseConn ? "good": "bad"}`}>{!dbaseConn && "Not "}Connected</span>

              <form onSubmit={this.handleDbasePost}>
                <div className="formOptionContainer">
                  <span className="formOptionLabel">Host</span>
                  <input
                    type="text"
                    value={dbaseHost}
                    placeholder="127.0.0.0"
                    onChange={this.setDbaseAddr}
                    required
                  />
                </div>
                <div className="formOptionContainer">
                  <span className="formOptionLabel">Port</span>
                  <input
                    type="text"
                    value={dbasePort}
                    placeholder="5001"
                    onChange={this.setDbasePort}
                    required
                  />
                </div>
                <button type="submit">S U B M I T</button>
              </form>  
            </div>}
          </div>
        </div>
      </div>
      );
    }
  }
  
  export default SetupArea;
  