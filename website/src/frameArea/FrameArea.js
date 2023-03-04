/* eslint no-unused-vars: 0 */
import "./FrameArea.css";
import React from "react";
import { connect } from "react-redux";
import Frame from "./frame/Frame";
import Timeline from "./timeline/Timeline";
import { getCurrentEvent } from "../redux/selectors";
import { frameDetails } from "../statics/testDetails"

const allFrames = frameDetails.frames.map((frame) => <Frame type={frame.type} imgSrc={frame.img} imgId={frame.id}/>)


class FrameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentEvent } = this.props;
    return (
      <div id="frameArea" className="movingIn">
        {allFrames[-currentEvent.currentEvent]}
        <Timeline />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentEvent = getCurrentEvent(state);
  return { currentEvent };
};

export default connect(mapStateToProps)(FrameArea);
