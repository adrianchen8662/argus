/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import "./FamilyMember.css";
import React from "react";
import { ReactComponent as Back } from "../../statics/back.svg"
import { apiHost } from "../../constants";
import TimelineFrame from "../../timelineArea/timelineFrame/TimelineFrame";

class FamilyMemberFrames extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      frameList: null
    }
  }

  componentDidMount() {
    this.initFrame();
  }

  componentDidUpdate(prevProps) {
    const { imgSrc } = this.props;

    if(imgSrc !== prevProps.imgSrc){
      this.initFrame();
    }
  }

  initFrame() {
    const { memberId } = this.props;
    const that = this;
      try {
        fetch(`${apiHost}/getfamilymemberframes?name=${memberId}`, {
          method: "GET",
        }).then((res) => res.json())
        .then((resJSON) => { 

          const frameList = Object.keys(resJSON).map((key) => {
            const validJsonStr = resJSON[key]
                                  .replace(/'/g, '"')
                                  .replace(/(Filename|Date|Time|Status|Compreface ID|Identification|Confidence):/g, '"$1":')
                                  .replace(/: ([^,]+),/g, ': "$1",')
  
            console.log(validJsonStr)
            
            // resJSON[key].replace('"','\'');
            return JSON.parse(validJsonStr);
          });
          console.log(frameList);
          that.setState({
            frameList: frameList.slice(0).reverse().map((frame) =>  <TimelineFrame key={frame.Filename} type={frame.Identification} imgSrc={frame.Filename} imgId={frame["Compreface ID"]}/>),
          })
          // resJSON[key].replace('"','\'');
          
        });
      } catch (err) {
        console.log(err);
      }
  }

  render() {
    const { memberId, backHandler, removeUserHandler } = this.props; 
    const {frameList} = this.state;
    // const images = require.context('../../../public/img/data_storage', true);
    // let img = "";
    // if(frameList && frameList.length) { 
    //   img = images(`./${frameList[0].key}.jpg`);
    // }

    return (
      <div className="memberFramesContainer movingIn">
        <div className="memberFramesHeader">
          <div className="backButtonContainer"  onClick={() => backHandler()}>
            <div className="backButtonComponent">
              <Back id="backButton" />
            </div>
            <span className="backButtonHelp">back</span>
          </div>
          <div className="memberHeaderName">
            {memberId}
          </div>
          <div className="backButtonContainer" onClick={() => removeUserHandler()}>
            <span className=" backButtonHelp">remove&nbsp;&nbsp;X</span>
            {/* {frameList && <img className="memberImg headerImg" src={`${img}`} alt="profile img"/>} */}
          </div>
        </div>
        <div id="memberFramesComponent">
          <span className="memberFrameHeading">Frames</span>
          <div id="memberFramesScroller">
            {frameList && frameList}
          </div>
        </div>
      </div>
      );
    }
  }
  
  export default FamilyMemberFrames;
  