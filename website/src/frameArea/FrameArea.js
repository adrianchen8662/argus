/* eslint no-unused-vars: 0 */
import "./FrameArea.css";
import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import Frame from "./frame/Frame";
// import Timeline from "./timeline/Timeline";
import { getCurrentEvent } from "../redux/selectors";
import { frameDetails } from "../statics/testDetails"
import { ReactComponent as Left } from "../statics/lArrow.svg";
import { ReactComponent as Right } from "../statics/RArrow.svg";

const allFrames = frameDetails.frames.map((frame) => <Frame type={frame.type} imgSrc={frame.img} imgId={frame.id}/>)


class FrameArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.state = {
      currentEvent: 0,
      totalFrames: allFrames.length - 1
    };
  }

  handleMoveRight () {
    const { currentEvent } = this.state;
    if(currentEvent < 0) {
      this.setState({
        currentEvent: currentEvent + 1
      })
    }
  }

  handleMoveLeft () {
    const { totalFrames, currentEvent } = this.state;
    if(currentEvent > -totalFrames) {
      this.setState({
        currentEvent: currentEvent - 1
      })
    }
  }

  render() {
    const { currentEvent, totalFrames } = this.state;
    const lArrowHide = currentEvent <= -totalFrames;
    const rArrowHide = currentEvent >= 0;
    return (
      <div id="frameArea" className="movingIn">
        <Left className={`slideArrow ${lArrowHide && "hideArrow"}`} onClick={this.handleMoveLeft}/>
        {allFrames[-currentEvent]}
        <Right className={`slideArrow ${rArrowHide && "hideArrow"}`} onClick={this.handleMoveRight}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentEvent = getCurrentEvent(state);
  return { currentEvent };
};

export default connect(mapStateToProps)(FrameArea);
