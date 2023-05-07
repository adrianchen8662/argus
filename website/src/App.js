/* eslint no-console: 0 */

import "./App.css";
import React from "react";
import { connect } from "react-redux";
import Header from "./header/Header";
import FrameArea from "./frameArea/FrameArea";
import FamilyArea from "./familyArea/FamilyArea";
import { getCurrentArea } from "./redux/selectors";
import { Areas, apiHost } from "./constants";
import SetupArea from "./setupArea/SetupArea";
import TimelineArea from "./timelineArea/TimelineArea";


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      familyList: null,
      framesList: null,
    }
    this.getFramesList = this.getFramesList.bind(this);
    this.getFamilyList = this.getFamilyList.bind(this);
  }

  async componentDidMount() {
    const that = this;
    try {
      fetch(`${apiHost}/getfamilylist`, {
        method: "GET",
      }).then((res) => res.json())
      .then((resJSON) => { 
        that.setState({familyList: resJSON.subjects});
      });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(`${apiHost}/getstatuslogs`, {
        method: "GET",
      }).then((res) => res.json())
      .then((resJSON) => { 
        console.log(resJSON);
        const frameList = Object.keys(resJSON).map((key) => {
          const validJsonStr = resJSON[key]
                                .replace(/'/g, '"')
                                .replace(/(Filename|Date|Time|Status|Compreface ID|Identification|Confidence):/g, '"$1":')
                                .replace(/: ([^,]+),/g, ': "$1",')

          console.log(validJsonStr)
          
          // resJSON[key].replace('"','\'');
          return JSON.parse(validJsonStr);
        });

        that.setState({framesList: frameList});
      });
    } catch (err) {
      console.log(err);
    }
    
  }

  getFramesList() {
    const { framesList } = this.state;
    return framesList;
  }

  getFamilyList() {
    const { familyList } = this.state;
    return familyList;
  }

  render() {
    const { currentArea } = this.props;
    return (
      <>
        <Header currentArea={currentArea.currentArea} />
        <div id="mainArea">
          {currentArea.currentArea === Areas.family_area  && <FamilyArea familyListReady={this.getFamilyList() !== null} getFamilyList={this.getFamilyList} />}
          {currentArea.currentArea === Areas.frame_area  && <FrameArea familyListReady={this.getFamilyList() !== null} familyList={this.getFamilyList()} framesReady={this.getFramesList() !== null} getFramesList={this.getFramesList} />}
          {currentArea.currentArea === Areas.setup_area && <SetupArea />}
          {currentArea.currentArea === Areas.timeline_area && <TimelineArea framesReady={this.getFramesList() !== null} getFramesList={this.getFramesList} />}
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
