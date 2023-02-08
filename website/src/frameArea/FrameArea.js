import "./FrameArea.css";
import React from "react";
import Frame from "./frame/Frame";
import Timeline from "./timeline/Timeline";

class FrameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="frameArea" className="movingIn">
        <Frame />
        <Timeline />
      </div>
    );
  }
}

export default FrameArea;
