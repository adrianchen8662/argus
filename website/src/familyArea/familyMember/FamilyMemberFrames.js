/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import "./FamilyMember.css";
import React from "react";
import { ReactComponent as Back } from "../../statics/back.svg"

class FamilyMemberFrames extends React.PureComponent {
  
  render() {
    const { memberId, backHandler } = this.props; 
    return (
      <div className="memberFramesContainer">
        <div className="memberFramesHeader">
          <div className="backButtonContainer" onClick={() => backHandler()}>
            <Back id="backButton" />
          </div>
          <div className="memberHeaderName">
            {memberId}: NAME
          </div>
          <div className="memberHeaderDetails">
            <img className="memberImg headerImg" src="https://dummyimage.com/800x800/ffffff/000000" alt="profile img"/>
          </div>
        </div>
        <div>
          Frames Here
        </div>
      </div>
      );
    }
  }
  
  export default FamilyMemberFrames;
  