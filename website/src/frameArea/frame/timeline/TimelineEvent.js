/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import "./Timeline.css";
import React from "react";
import { calcDate, calcTime, TIMELINE_VIEWS } from "../../../constants";
import {ReactComponent as AddtoFamily} from "../../../statics/addtofamily2.svg"
import { familyDetails } from "../../../statics/testDetails";

const family = familyDetails.family_members;

class TimelineEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSwitchToAtoF = this.handleSwitchToAtoF.bind(this);
    this.handleSwitchToFtoA = this.handleSwitchToFtoA.bind(this);
    this.state = {
      currentView: TIMELINE_VIEWS.basic_view,
    }
  }

  componentDidUpdate(prevProps) {
    const { timestamp } = this.props;
    if (timestamp !== prevProps.timestamp) {
      this.setState({
        currentView: TIMELINE_VIEWS.basic_view
      });
    }
  }

  handleAssignFamilyMember = async (e, name) => {
    e.preventDefault();
    const { timestamp } = this.props;
    const res = await fetch(`http://localhost:5000/assignfamilytoimage?timestamp=${timestamp}&member=${name}`, {
      method: "GET",
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
    const { eventType, timestamp, familyList } = this.props;
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
              {family.map((familyMember) => (
                <div className="timelineFamilyM">{familyMember.name}</div>
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
            {familyList.map((member) => (<div className="timelineFamilyM" onClick={this.handleAssignFamilyMember(`${member}`)}>{member}</div>))}
          </div>}
        </div>
      </div>
    );
  }
}

export default TimelineEvent;
