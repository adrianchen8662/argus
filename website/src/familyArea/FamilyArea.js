/* eslint no-unused-vars: 0 */
/* eslint react/jsx-no-bind: 0 */
import "./FamilyArea.css";
import React from "react";
import { connect } from "react-redux";
import FamilyMember from "./familyMember/FamilyMember"
import { familyDetails } from "../statics/testDetails"
import { FamilyAreaViews } from "../constants";
import FamilyMemberFrames from "./familyMember/FamilyMemberFrames";
import { ReactComponent as FamilyHead } from "../statics/familyhead.svg";

class FamilyArea extends React.PureComponent {
  allMembers = familyDetails.family_members.map((familyMember) => 
    <FamilyMember 
      familyMemberId={familyMember.id} 
      imgSrc={familyMember.profile_photo} 
      name={familyMember.name}
      clickHandler={this.handleMemberClick.bind(this)}
    />
  )

  constructor(props) {
    super(props);
    this.handleMemberClick = this.handleMemberClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.state = {
      currentFamilyView: FamilyAreaViews.all_members,
      memberId: null,
    }
  }

  handleMemberClick(memberId) {
    this.setState({
      currentFamilyView: FamilyAreaViews.one_member,
      memberId,
    })
  }

  handleBackClick() {
    this.setState({
      currentFamilyView: FamilyAreaViews.all_members,
      memberId: null,
    })
  }

  oneMember = () => {
    const { memberId } = this.state;
    return (<FamilyMemberFrames memberId={memberId} backHandler={this.handleBackClick.bind(this)} />);

  }

  render() {
    const { currentFamilyView, memberId } = this.state;
    return (
      <div id="familyArea" className="mainViewArea">
        <div id="familyMembersList" className="movingIn">
        { currentFamilyView === FamilyAreaViews.all_members && this.allMembers }
        { currentFamilyView === FamilyAreaViews.one_member && this.oneMember() }
        </div>
      </div>
      );
    }
  }
  

  
export default (FamilyArea);
  