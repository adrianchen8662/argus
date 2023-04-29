/* eslint no-unused-vars: 0 */
import "./FrameArea.css";
import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import Frame from "./frame/Frame";
// import Timeline from "./timeline/Timeline";
import { getCurrentEvent } from "../redux/selectors";
import { frameDetails } from "../statics/testDetails";
import { ReactComponent as Left } from "../statics/lArrow.svg";
import { ReactComponent as Right } from "../statics/RArrow.svg";
import { getFileNameFromTimestamp } from "../constants";




class FrameArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.state = {
      currentEvent: 0,
      totalFrames: 0,
      allFrames: null
    };
  }

  


  componentDidMount() {
    this.initFrameArea();

  };

  componentDidUpdate(prevProps, prevState) {
    this.initFrameArea();
  }

  handleMoveRight () {
    const { totalFrames, currentEvent } = this.state;
    if(currentEvent <= totalFrames) {
      this.setState({
        currentEvent: currentEvent + 1
      })
    }
  }

  handleMoveLeft () {
    const {  currentEvent } = this.state;
    if(currentEvent >= 0) {
      this.setState({
        currentEvent: currentEvent - 1
      })
    }
  }

  getFrame (event) {
    console.log("CALLED", event);
    const { allFrames } = this.state;
    console.log(allFrames);
    return allFrames[event];
  }

initFrameArea() {
    const {allFrames} = this.state;
    const {getFramesList, framesReady, familyList} = this.props;
    let frameList = null;
    if(!allFrames && framesReady) {
      frameList = getFramesList();
      console.log("didUpdate", frameList);
      console.log(familyList)
      if(frameList) {
        this.setState({
          allFrames: frameList.map((frame) =>  <Frame familyList={familyList} imgSrc={frame.filename} />),
          totalFrames: frameList.length - 1,
          currentEvent: frameList.length - 1,
        });
      }
    }
  }


  render() {
    const { currentEvent, totalFrames, allFrames} = this.state;

    const lArrowHide = currentEvent <= 0;
    const rArrowHide = currentEvent >= totalFrames;
    return (
      <div id="frameArea" className="movingIn">
        <Left className={`slideArrow ${lArrowHide && "hideArrow"}`} onClick={this.handleMoveLeft}/>
        { allFrames !== null && this.getFrame(currentEvent) }
        <Right className={`slideArrow ${rArrowHide && "hideArrow"}`} onClick={this.handleMoveRight}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const currentEvent = getCurrentEvent(state);
  return { currentEvent };
};

export default connect(mapStateToProps)(FrameArea);
