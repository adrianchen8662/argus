/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import "./FamilyMember.css";
import React from "react";
import {ReactComponent as AddtoFamily} from "../../statics/addtofamily2.svg"
import {ReactComponent as FamilyMemberImg} from "../../statics/People.svg"

class FamilyMember extends React.PureComponent {
  render() {
    const { getImgSrc, name, clickHandler, familyMemberId } = this.props; 
    const images = require.context('../../../public/img/data_storage', true);
    let img = "";
    if(getImgSrc && getImgSrc(name)) { 
      img = (<img src={images(`./${getImgSrc(name)}.jpg`)} className="memberLead headerImg" alt="Test Frame" />);
    } else if (getImgSrc && !getImgSrc(name)) {
      img = <FamilyMemberImg className="memberLead headerImg"/>
    }
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
          { img }
        </div>
        <div className="memberName">
          {name} 
        </div>
      </div>
      
    );
  }
}

export default FamilyMember;
