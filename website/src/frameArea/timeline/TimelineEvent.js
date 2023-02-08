import "./Timeline.css";
import React from "react";

class TimelineEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEventType: "Delivery",
    };
  }

  render() {
    const { currentEventType } = this.state;
    return (
      <div className="timelineEvent">
        <div className= {`timelineEventText ${currentEventType}`}>
          <span>{currentEventType}</span>
        </div>
        <div className="timelineEventTime">
          <span>6:02 PM</span>
          <br />
          <span>Monday, Feb 2</span>
        </div>
      </div>
    );
  }
}

export default TimelineEvent;
