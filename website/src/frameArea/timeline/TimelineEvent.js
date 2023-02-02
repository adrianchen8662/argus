import './Timeline.css';
import React from 'react';

class TimelineEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="timelineEvent">
        <div className="timelineEventText">
          <span>Delivery Event</span>
        </div>
        <div className="timelineEventTime">
          <span>Feb 2, 6:02PM</span>
        </div>
      </div>
    );
  }
}

export default TimelineEvent;
