/* eslint no-unused-vars: 0 */
import "./TimelineArea.css";
import React from "react";
import { connect } from "react-redux";
import TimelineFrame from "./timelineFrame/TimelineFrame";
import { frameDetails } from "../statics/testDetails"

const allFrames = frameDetails.frames.map((frame) => <TimelineFrame type={frame.type} imgSrc={frame.img} imgId={frame.id}/>);


class TimelineArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div id="timelineArea" className="mainViewArea">
        <div id="timelinePhotosArea" className="movingIn">
          {allFrames}
          {allFrames}
          {allFrames}
        </div>
      </div>
      );
    }
  }
  
  export default connect()(TimelineArea);
  