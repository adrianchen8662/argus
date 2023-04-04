/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import "./Timeline.css";
import React from "react";
import { calcDate, calcTime, TIMELINE_VIEWS } from "../../constants";
import {ReactComponent as AddtoFamily} from "../../statics/addtofamily2.svg"
import {ReactComponent as Info} from "../../statics/info2.svg"




class TimelineEvent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleSwitchToAtoF = this.handleSwitchToAtoF.bind(this);
    this.state = {
      currentView: TIMELINE_VIEWS.basic_view,
    }
  }

  handleSwitchToAtoF() {
    this.setState({
      currentView: TIMELINE_VIEWS.addtofamily_view,
    })
  }

  render() {
    const { currentView } = this.state;
    const { eventType, timestamp } = this.props;
    if(currentView === TIMELINE_VIEWS.basic_view) {
      return (
        <div className="timelineEvent">
          <div className="timelineEventButtonContainer" onClick={this.handleSwitchToAtoF}> 
            <AddtoFamily className="addtofamilyButton timelineEventButton" />
            <span>Add to Family</span>
          </div>
          <div className="timelineEventDetails">
            <div className= {`timelineEventText ${eventType}`}>
              <span>{eventType}</span>
            </div>
            
            <div className="timelineEventTime">
              <span>{calcTime(timestamp)}</span>
              <br />
              <span>{calcDate(timestamp)}</span>
            </div>
          </div>
          <div className="timelineEventButtonContainer"> 
            <Info className="addtofamilyButton timelineEventButton" />
            <span>Details</span>
          </div>
        </div>
      );
    }
    return (
      <div className="timelineEvent">        
        <div className="timelineEventDetails">
          <div className="timelineEventTime">
            <span>{calcTime(timestamp)}</span>
            <br />
            <span>{calcDate(timestamp)}</span>
          </div>
        </div>
    </div>
    )
    // } 
  }
}

export default TimelineEvent;
