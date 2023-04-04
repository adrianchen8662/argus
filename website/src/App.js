import "./App.css";
import React from "react";
import { connect } from "react-redux";
import Header from "./header/Header";
import FrameArea from "./frameArea/FrameArea";
import FamilyArea from "./familyArea/FamilyArea";
import { getCurrentArea } from "./redux/selectors";
import { Areas } from "./constants";
import LiveArea from "./liveArea/LiveArea";
import TimelineArea from "./timelineArea/TimelineArea";


class App extends React.PureComponent {
 
  render() {
    const { currentArea } = this.props;

    return (
      <>
        <Header currentArea={currentArea.currentArea} />
        <div id="mainArea">
          {currentArea.currentArea === Areas.family_area  && <FamilyArea />}
          {currentArea.currentArea === Areas.frame_area  && <FrameArea />}
          {currentArea.currentArea === Areas.live_area && <LiveArea />}
          {currentArea.currentArea === Areas.timeline_area && <TimelineArea />}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const currentArea = getCurrentArea(state);
  return { currentArea };
};

export default connect(mapStateToProps)(App);
