/* eslint react/destructuring-assignment: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import "./Header.css";
import React from "react";
import { connect } from "react-redux";
import { ReactComponent as Family } from "../statics/People_new.svg";
import { ReactComponent as Frame } from "../statics/Latest.svg";
import { ReactComponent as Info } from "../statics/calendar_new.svg";
import { ReactComponent as Logo } from "../statics/logo.svg";
import { ReactComponent as TimelineHead } from "../statics/timelinehead.svg";
import { ReactComponent as LiveHead } from "../statics/livehead.svg";
import { ReactComponent as FamilyHead } from "../statics/familyhead.svg";
import { ReactComponent as GoodStatus } from "../statics/goodconnstatus.svg";
import { ReactComponent as BadStatus } from "../statics/badconnstatus.svg";

import { Areas } from "../constants";



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeToFamily = this.handleChangeToFamily.bind(this);
    this.handleChangeToFrames = this.handleChangeToFrames.bind(this);
    this.handleChangeToLive = this.handleChangeToLive.bind(this);
    this.handleChangeToTimeline = this.handleChangeToTimeline.bind(this);
    this.state = {
      connStatus: false,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:5000/getstatus", {
        method: "GET",
        body: null,
      });
      if (res.status === 200) {
        this.setState({connStatus: true});
      } else {
        this.setState({connStatus: true});
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleChangeToFamily() {
    this.props.changeArea(Areas.family_area);
  }

  handleChangeToFrames() {
    this.props.changeArea(Areas.frame_area);
  }

  handleChangeToLive() {
    this.props.changeArea(Areas.live_area);
  }

  handleChangeToTimeline() {
    this.props.changeArea(Areas.timeline_area);
  }

  render() {
    const { connStatus } = this.state;
    const { currentArea } = this.props; 
    return (
        <div id="header">
          <div id="logoHeader">
            {currentArea === Areas.frame_area && <Logo id="logoImg" className="headerCurrentHeading"/>}
            {connStatus ? <GoodStatus className="headerStatus" /> : <BadStatus className="headerStatus" />}
            {currentArea === Areas.timeline_area && <TimelineHead className="headerCurrentHeading movingIn"/>}
            {currentArea === Areas.live_area && <LiveHead className="headerCurrentHeading movingIn"/>}
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

