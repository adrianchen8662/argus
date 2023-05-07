/* eslint no-unused-vars: 0 */
/* eslint react/jsx-no-bind: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import "./FamilyArea.css";
import React from "react";
import FamilyMember from "./familyMember/FamilyMember"
import { FamilyAreaViews, apiHost } from "../constants";
import FamilyMemberFrames from "./familyMember/FamilyMemberFrames";
import { ReactComponent as Back } from "../statics/back.svg"


class FamilyArea extends React.PureComponent {
  

  constructor(props) {
    super(props);
    this.handleMemberClick = this.handleMemberClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);

    this.state = {
      currentFamilyView: FamilyAreaViews.all_members,
      familyList: null,
      memberId: null,
      memberName: '',
      // memberPhoto: null,
      leadFrameList: null,
    }
  }


  componentDidMount() {
    this.initFamilyArea();
  }

  componentDidUpdate(){
    this.initFamilyArea();
  }

  handleMemberClick(e, memberId) {
    const {getFamilyList} = this.props;
    const memberName = getFamilyList()[memberId];
    this.setState({
      currentFamilyView: FamilyAreaViews.one_member,
      memberId: memberName
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
    const { memberName } = this.state;
    event.preventDefault();
    try {
      fetch(`${apiHost}/postnewfamilymember?name=${memberName}`, {
        method: "POST",
      }).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };

  handleRemoveUser = async (event) => {
    const { memberId } = this.state;
    // event.preventDefault();
    console.log(memberId);
    try {
      fetch(`${apiHost}/removefamilymember?name=${memberId}`, {
        method: "POST",
      }).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };

  getleadFrame(memberName) {
    const { leadFrameList } = this.state;
    return leadFrameList[memberName];
  }

  allMembers = () =>  {
    const {familyList} = this.state;

    return (<>
    {familyList}
    <FamilyMember 
      familyMemberId="+"
      clickHandler={this.handleAddClick.bind(this)}
    />
    </>)}

  oneMember = () => {
    const { memberId, familyList } = this.state;
    return (<FamilyMemberFrames memberId={memberId} removeUserHandler={this.handleRemoveUser} backHandler={this.handleBackClick.bind(this)} />);
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
      </div>
      <form className="inputForm" onSubmit={this.handleNewMember.bind(this)}>
      <span className="addNewMemberHead">New Family Member</span>
        <div className="inputContainer">
          <input name="memberName" className="inputName" type="text" placeholder="Name" onChange={this.handleInputChange}/>
        </div>
        {/* <div className="inputContainer">          
          <label className="inputPhotoLabel" htmlFor="photo">
            <span className="inputHelp">Photo</span>
            <input name="memberPhoto" id="photo" className="inputIMG" type="file" placeholder="Argus" onChange={this.handleInputChange}/>
          </label>
        </div> */}
        <button className="formSubmitButton inputHelp" type="submit">A D D</button>
      </form>
    </div> );
  }

  initFamilyArea() {
    const {getFamilyList, familyListReady} = this.props;
    const {familyList} = this.state;
    const that = this;
    let currList = null
    if(!familyList && familyListReady) {
      currList = getFamilyList();
      if(currList) {
        const leadFrameList = {};
        currList.forEach((memberId) => {
          let fileName = "none";
          try {
            fileName = fetch(`${apiHost}/getfamilymemberframes?name=${memberId}`, {
              method: "GET",
            }).then((res) => res.json())
            .then((resJSON) => {leadFrameList[memberId] = Object.keys(resJSON)[Object.keys(resJSON).length - 1]})
            .then(() => {
              
              that.setState({
                leadFrameList,
                familyList: currList.map((familyMember, i) => (
                <FamilyMember 
                  key={familyMember}
                  familyMemberId={i} 
                  getImgSrc={this.getleadFrame.bind(this) } 
                  name={familyMember}
                  clickHandler={(e) => this.handleMemberClick.bind(this)(e, i)}
                />))
              })
            });
          } catch (err) {
            console.log(err);
          } 
        });
        
        
        
      }
    }
  }


  render() {
    const { currentFamilyView, leadFrameList } = this.state;

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
  