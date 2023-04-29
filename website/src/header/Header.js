/* eslint react/destructuring-assignment: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import "./Header.css";
import React from "react";
import { connect } from "react-redux";
import { ReactComponent as Family } from "../statics/People_new.svg";
import { ReactComponent as Frame } from "../statics/Latest.svg";
import { ReactComponent as Info } from "../statics/calendar.svg";
import { ReactComponent as Logo } from "../statics/logo.svg";
import { ReactComponent as TimelineHead } from "../statics/timelinehead.svg";
import { ReactComponent as FamilyHead } from "../statics/familyhead.svg";
import { ReactComponent as GoodStatus } from "../statics/goodconnstatus.svg";
import { ReactComponent as BadStatus } from "../statics/badconnstatus.svg";

import { Areas, apiHost, getConnVals } from "../constants";



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeToFamily = this.handleChangeToFamily.bind(this);
    this.handleChangeToFrames = this.handleChangeToFrames.bind(this);
    this.handleChangeToLive = this.handleChangeToLive.bind(this);
    this.handleChangeToTimeline = this.handleChangeToTimeline.bind(this);
    this.state = {
      connStatus: false,
      cfaceConn: false,
      dbaseConn: false,
      dbellConn: false
    };
  }

  componentDidMount() {
    try {
      fetch(`${apiHost}/getstatus`, {
        method: "GET"
      }).then((res) => 
      {
        if(res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then((resJSON) => {
        if(resJSON){
          this.setState({connStatus: true});
          const connVals = getConnVals(resJSON)
          this.setState({
            cfaceConn: connVals.Compreface,
            dbaseConn: connVals.Database,
            dbellConn: connVals.Doorbell,
          })
          console.log(resJSON)
          console.log(connVals)
        }
      
    });
    } catch (err) {
      console.log(err);
      this.props.changeArea(Areas.setup_area)
    }
  };

  handleChangeToFamily() {
    this.props.changeArea(Areas.family_area);
  }

  handleChangeToFrames() {
    this.props.changeArea(Areas.frame_area);
  }

  handleChangeToLive() {
    this.props.changeArea(Areas.setup_area);
  }

  handleChangeToTimeline() {
    this.props.changeArea(Areas.timeline_area);
  }

  render() {
    const { connStatus, cfaceConn, dbaseConn, dbellConn } = this.state;
    const { currentArea } = this.props; 
    return (
        <div id="header">
          <div id="logoHeader">
            <div className="headerStatusContainer" onClick={this.handleChangeToLive}>
              {connStatus ? <GoodStatus className="headerStatus" /> : <BadStatus className="headerStatus" />}
              <span className={`headerStatusSpan ${connStatus ? "good" : "bad"}`}>conn</span>
              <div className="headerStatusPtsContainer">
                <span className={`headerStatusSpan2 ${cfaceConn ? "good" : "bad"}`}>•</span>
                <span className={`headerStatusSpan2 ${dbaseConn ? "good" : "bad"}`}>•</span>
                <span className={`headerStatusSpan2 ${dbellConn ? "good" : "bad"}`}>•</span>
              </div>
            </div>
            {(currentArea === Areas.frame_area || currentArea === Areas.setup_area)  && <Logo id="logoImg" className="headerCurrentHeading"/>}
            {currentArea === Areas.timeline_area && <TimelineHead className="headerCurrentHeading movingIn"/>}
            {/* {currentArea === Areas.error_area && <SetupHead className="headerCurrentHeading movingIn"/>} */}
            {currentArea === Areas.family_area && <FamilyHead className="headerCurrentHeading movingIn"/>}
          </div>
          <div id="menuHeader">
            {/* {currentArea !== Areas.live_area && <div className="headerButtonContainer" onKeyDown={this.handleChangeToLive} onClick={this.handleChangeToLive}>
              <Eye className="menuSVG" id="eyeButton" />
              <span>Live</span>
            </div>
            } */}
            {/* {currentArea !== Areas.family_area &&  */}
              <div id="familyButtonContainer" className="headerButtonContainer" onKeyDown={this.handleChangeToFamily} onClick={this.handleChangeToFamily}>
                <Family className="menuSVG" id="familyButton" />
                <span>Family</span>
              </div> 

            {/* {currentArea !== Areas.frame_area &&  */}
              <div id="framesButtonContainer" className="headerButtonContainer" onKeyDown={this.handleChangeToFrames} onClick={this.handleChangeToFrames}>
                <Frame className="menuSVG" id="frameButton" />
                <span>Latest</span>
              </div> 
            
            
            {/* {currentArea !== Areas.timeline_area &&  */}
            <div id="timelineButtonContainer" className="headerButtonContainer" onKeyDown={this.handleChangeToTimeline} onClick={this.handleChangeToTimeline}>
              <Info className="menuSVG" id="timelineButton" />
              <span>Timeline</span>
            </div>
          </div>
        </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
    changeArea: (newArea) => dispatch({type: "CHANGE_AREA", newArea})
});



export default connect(null, mapDispatchToProps)(Header);

