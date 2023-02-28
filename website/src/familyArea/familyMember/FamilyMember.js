/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import "./FamilyMember.css";
import React from "react";

class FamilyMember extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.handleMouseEnter = this.handleMouseEnter.bind(this);
  //   this.handleMouseExit = this.handleMouseExit.bind(this);
  //   this.state = {
  //       hover: false
  //   };
  // }

  // handleMouseEnter() {
  //   this.setState({
  //       hover: true
  //   })
  // }

  // handleMouseExit() {
  //   this.setState({
  //       hover: false
  //   })
  // }

  //  
  render() {
    const { imgSrc, name, clickHandler, familyMemberId } = this.props; 
    // const { hover } = this.state;
    return (
      <div className="memberDetails" onClick={() => clickHandler(familyMemberId)}>
         {/* onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}> */}
        <div className="memberImg">
          <img src={imgSrc} alt="Test Frame" />
        </div>
        <div className="memberName">
          {name} 
          {/* {hover && <span>-&gt;</span>} */}
        </div>
      </div>
      
    );
  }
}

export default FamilyMember;
