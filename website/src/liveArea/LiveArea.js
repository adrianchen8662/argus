/* eslint no-unused-vars: 0 */
import "./LiveArea.css";
import React from "react";
import { connect } from "react-redux";
import Lost from "../statics/lost.png"


class LiveArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div id="liveArea" className="mainViewArea">
        <div id="liveStreamArea" className="movingIn">
          <img src={Lost} alt="no live view yet"/>
        </div>
      </div>
      );
    }
  }
  
  export default connect()(LiveArea);
  