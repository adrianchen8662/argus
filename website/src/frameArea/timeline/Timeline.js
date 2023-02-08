import "./Timeline.css";
import React from "react";
import { ReactComponent as Left } from "../../statics/Left.svg";
import { ReactComponent as Right } from "../../statics/Right.svg";
import TimelineEvent from "./TimelineEvent";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="timeline">
        <Left className="timelineArrow" />
        <TimelineEvent />
        <Right className="timelineArrow" />
      </div>
    );
  }
}

export default Timeline;
