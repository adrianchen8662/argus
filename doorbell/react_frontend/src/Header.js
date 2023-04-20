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
    this.connectionStatus = true;
  }

  render() {
    return (
      <>
        <div id="header">
          <div id="logoHeader">
            <Logo id="logoImg" className="headerCurrentHeading"/>
          </div>
          <div id="connStatusContainer">
            {this.connectionStatus ? <ConnStatusGood className="menuSVG good" /> : <ConnStatusBad className="menuSVG bad" />}
            {this.connectionStatus ? (<span className="connStatusSpan good">Connected</span>) : (<span className="connStatusSpan bad">Not Connected</span>)}

          </div>
        </div>
      </>
    );
  }
}



export default Header;

