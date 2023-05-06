/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import "./Timeline.css";
import React from "react";
import { apiHost, calcDate, calcTime, TIMELINE_VIEWS } from "../../../constants";
import {ReactComponent as AddtoFamily} from "../../../statics/addtofamily2.svg"


class TimelineEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSwitchToAtoF = this.handleSwitchToAtoF.bind(this);
    this.handleSwitchToFtoA = this.handleSwitchToFtoA.bind(this);
    this.state = {
      currentView: TIMELINE_VIEWS.basic_view,
      update: [],
    }
  }

  componentDidUpdate(prevProps) {
    const { eventType, timestamp } = this.props;
    const { update } = this.state;
    if (eventType !== prevProps.eventType || timestamp !== prevProps.timestamp) {
      this.setState({
        currentView: TIMELINE_VIEWS.basic_view,
        update: [...update]
      });
    }

  }

  handleAssignFamilyMember = async (e, name) => {
    e.preventDefault();
    const { timestamp } = this.props;
    const res = await fetch(`${apiHost}/assignfamilytoimage?timestamp=${timestamp}&member=${name}`, {
      method: "POST",
      body: null,
    });
    if (res.status === 200) {
      console.log("hello");
    } else {
      console.log("hello");
    }
  }
  

  handleSwitchToFtoA() {
    this.setState({
      currentView: TIMELINE_VIEWS.basic_view,
    })
  }
  
  handleSwitchToAtoF() {
    this.setState({
      currentView: TIMELINE_VIEWS.addtofamily_view,
    })
  }

  render() {
    const { currentView } = this.state;
    const { eventType, timestamp, familyList, memberName } = this.props;

    return (
      <div className="timelineEvent">
        {currentView === TIMELINE_VIEWS.basic_view &&<div className="frameTimelinePart timelineEventDetails timelineEventType">
          <div className= {`timelineEventText  ${eventType}`}>
            <span>{eventType}</span>
          </div>
        </div>}
        <div className="frameTimelinePart timelineEventDetails timelineEventTimeSection">
          <div className="timelineEventTime">
            <span className="frameDate">{calcDate(timestamp)}</span>
            <span className="frameTime">{calcTime(timestamp)}</span>
          </div>
        </div>
        <div className="frameTimelinePart frameTimelineButtonsContainer">
          {eventType !== "Family" && currentView === TIMELINE_VIEWS.basic_view &&
          <div className="timelineEventButtonContainer" onClick={this.handleSwitchToAtoF}> 
            <AddtoFamily className="addtofamilyButton timelineEventButton" />
          </div>}
          {eventType !== "Family" && currentView === TIMELINE_VIEWS.addtofamily_view &&
          <div className="timelineFamilyContainer"> 
            <span className="timelineEventFamilyTextHead">Add To Family?</span>
            <div className="timelineFamilyMList">
              {familyList.map((familyMember) => (
                <div className="timelineFamilyM" onClick={(e) => this.handleAssignFamilyMember(e, familyMember)}>{`${familyMember}`}</div>
                ))
              }
            </div>
            <div className="timelineFamilyMenu">
              <span onClick={this.handleSwitchToFtoA}>{"<"} cancel</span>
              <span>scroll for more {">"}</span>
            </div>
          </div>}
          {eventType === "Family" && currentView === TIMELINE_VIEWS.basic_view &&
          <div className="timelineEventButtonContainer"> 
            <div className="timelineFamilyM">{`${memberName}`}</div>
          </div>}
        </div>
      </div>
    );
  }
}

export default TimelineEvent;
