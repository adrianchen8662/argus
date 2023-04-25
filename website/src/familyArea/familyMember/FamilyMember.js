/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import "./FamilyMember.css";
import React from "react";
import {ReactComponent as AddtoFamily} from "../../statics/addtofamily2.svg"

class FamilyMember extends React.PureComponent {
  render() {
    const { imgSrc, name, clickHandler, familyMemberId } = this.props; 
    if(familyMemberId === "+") {
      return (
        <div className="memberDetails addMemberContainer" onClick={() => clickHandler(familyMemberId)}>
          {/* <div className="memberName"> */}
            <AddtoFamily className="addtofamilyButton" />
            <span className="addtofamilyHelp">N E W</span>
          {/* </div> */}
        </div>
      )
    }
    
    return (
      <div className="memberDetails" onClick={() => clickHandler(familyMemberId)}>
        <div className="memberImg">
          <img src={imgSrc} alt="Test Frame" />
        </div>
        <div className="memberName">
          {name} 
        </div>
      </div>
      
    );
  }
}

export default FamilyMember;
