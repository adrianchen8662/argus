/* eslint no-unused-vars: 0 */
import "./TimelineArea.css";
import React from "react";
import { connect } from "react-redux";
import TimelineFrame from "./timelineFrame/TimelineFrame";


class TimelineArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFrames: null
    };
  }

  componentDidMount() {
    this.initTimelineArea();
  }

  componentDidUpdate() {
    this.initTimelineArea();
  }

  initTimelineArea() {
    const { allFrames } = this.state;
    const { getFramesList, framesReady } = this.props;
    let frameList = null;
    if(!allFrames && framesReady) {
      frameList = getFramesList();
      console.log("didUpdate", frameList);
      if(frameList) {
        this.setState({
          allFrames: frameList.map((frame) =>  <TimelineFrame type={frame.Identification} imgSrc={frame.Filename} imgId={frame["Compreface ID"]}/>),
        });
      }
    }
  }

  render() {
    const {allFrames} = this.state;
    return (
      <div id="timelineArea" className="mainViewArea">
        <div id="timelinePhotosArea" className="movingIn">
          {allFrames}
        </div>
      </div>
      );
    }
  }
  
  export default connect()(TimelineArea);
  