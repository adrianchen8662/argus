/* eslint no-unused-vars: 0 */
/* eslint react/jsx-no-bind: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import "./FamilyArea.css";
import React from "react";
import axios from 'axios';
import FamilyMember from "./familyMember/FamilyMember"
import { familyDetails } from "../statics/testDetails"
import { FamilyAreaViews } from "../constants";
import FamilyMemberFrames from "./familyMember/FamilyMemberFrames";
import { ReactComponent as Back } from "../statics/back.svg"


class FamilyArea extends React.PureComponent {
  listMembers = familyDetails.family_members.map((familyMember) => 
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
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);

    this.state = {
      currentFamilyView: FamilyAreaViews.all_members,
      memberId: null,
      memberName: '',
      memberPhoto: null,
    }
  }

  handleMemberClick(memberId) {
    this.setState({
      currentFamilyView: FamilyAreaViews.one_member,
      memberId,
    })
  }

  handleAddClick() {
    this.setState({
      currentFamilyView: FamilyAreaViews.add_member,
    })
  }

  handleBackClick() {
    this.setState({
      currentFamilyView: FamilyAreaViews.all_members,
      memberId: null,
    })
  }

  handleInputChange = (event) => {
    const { name, value, type } = event.target;
    this.setState({
      [name]: type === 'file' ? event.target.files[0] : value,
    });
  };

  handleNewMember= async (event) => {
    const { memberName, memberPhoto } = this.state;
    event.preventDefault();

    const formData = new FormData();
    formData.append('memberName', memberName);
    formData.append('memberPhoto', memberPhoto);

    try {
      const response = await axios.post('test_host', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  allMembers = () =>  (<>
      {this.listMembers}
      <FamilyMember 
        familyMemberId="+"
        clickHandler={this.handleAddClick.bind(this)}
      />
    </>)

  oneMember = () => {
    const { memberId } = this.state;
    return (<FamilyMemberFrames memberId={memberId} backHandler={this.handleBackClick.bind(this)} />);
  }

  addMember = () => {
    const { memberId } = this.state;
    return (
    <div className="formContainer">
      <div className="addNewMemberTop">
        <div className="backButtonContainer"  onClick={this.handleBackClick.bind(this)}>
          <div className="backButtonComponent">
            <Back id="backButton" />
          </div>
          <span className="backButtonHelp">back</span>
        </div>
        {/* <span className="addNewMemberHead">New Family Member</span> */}
      </div>
      <form className="inputForm" onSubmit={this.handleNewMember.bind(this)}>
        <div className="inputContainer">
          <input name="memberName" className="inputName" type="text" placeholder="Name" onChange={this.handleInputChange}/>
        </div>
        <div className="inputContainer">          
          <label className="inputPhotoLabel" htmlFor="photo">
            <span className="inputHelp">Photo</span>
            <input name="memberPhoto" id="photo" className="inputIMG" type="file" placeholder="Argus" onChange={this.handleInputChange}/>
          </label>
        </div>
        <button className="formSubmitButton inputHelp" type="submit">A D D</button>
      </form>
    </div> );
  }

  render() {
    const { currentFamilyView, memberId } = this.state;
    return (
      <div id="familyArea" className="mainViewArea">
        <div id="familyMembersList" className="movingIn">
        { currentFamilyView === FamilyAreaViews.all_members && this.allMembers() }
        { currentFamilyView === FamilyAreaViews.one_member && this.oneMember() }
        { currentFamilyView === FamilyAreaViews.add_member && this.addMember() }
        </div>
      </div>
      );
    }
  }
  

  
export default (FamilyArea);
  