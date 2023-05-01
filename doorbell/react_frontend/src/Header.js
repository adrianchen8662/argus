/* eslint react/destructuring-assignment: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import "./Header.css";
import React from "react";
import { ReactComponent as Logo } from "../src/HeaderSetup.svg";
import { ReactComponent as ConnStatusGood } from "../src/ConnStatusGood.svg"
import { ReactComponent as ConnStatusBad } from "../src/ConnStatusBad.svg"




class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionStatus: false,
    }
  }

  async componentDidMount() {
    try {
      let res = await fetch("http://127.0.0.1:5000/getstatus", {
        method: "GET",
      });
      if (res.status === 200) {
        this.setState({connectionStatus: true});
      } else {
        this.setState({connectionStatus: false});
      }
    } catch (err) {
      this.setState({connectionStatus: false});
    }
  }

  render() {
    const { connectionStatus } = this.state;
    return (
      <>
        <div id="header">
          <div id="logoHeader">
            <Logo id="logoImg" className="headerCurrentHeading"/>
          </div>
          <div id="connStatusContainer">
            {connectionStatus ? <ConnStatusGood className="menuSVG good" /> : <ConnStatusBad className="menuSVG bad" />}
            {connectionStatus ? (<span className="connStatusSpan good">Connected</span>) : (<span className="connStatusSpan bad">Not Connected</span>)}

          </div>
        </div>
      </>
    );
  }
}



export default Header;

