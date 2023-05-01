import "./Frame.css";
import React from "react";
import TimelineEvent from "./timeline/TimelineEvent";
import { getTimestampFromImgSrc, apiHost } from "../../constants";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.initFrame = this.initFrame.bind(this);
    this.state = {
      frameConf: -1,
      frameStatus: null,
      frameMemberID: null
    };
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
    const { imgSrc } = this.props;
    const that = this;
      try {
        fetch(`${apiHost}/getmetadata?timestamp=${imgSrc}`, {
          method: "GET",
        }).then((res) => res.json())
        .then((resJSON) => { 
          console.log("CalledMeta", resJSON);
          const validJsonStr = resJSON[imgSrc]
                                .replace(/'/g, '"')
                                .replace(/(Filename|Date|Time|Status|Compreface ID|Identification|Confidence):/g, '"$1":')
                                .replace(/: ([^,]+),/g, ': "$1",')

          console.log("here::", validJsonStr);
          
          // resJSON[key].replace('"','\'');
          const frameDetails = JSON.parse(validJsonStr);
          that.setState({
            frameConf: frameDetails.Confidence,
            frameStatus: frameDetails.Identification,
            frameMemberID: frameDetails["Compreface ID"],
          })
        });
      } catch (err) {
        console.log(err);
      }
  }

  
  render() {
    const images = require.context('../../../public/img/data_storage', true);
    const { imgSrc, familyList } = this.props; 
    const { frameConf, frameStatus, frameMemberID } = this.state;
    const img = images(`./${imgSrc}.jpg`);
    return (
      <div className={`frame frame-${frameStatus}`} id="12">
        <img src={`${img}`} alt="Test Frame" />
        <TimelineEvent memberName={frameMemberID} familyList={familyList} eventType={frameStatus} frameConf={frameConf} timestamp={getTimestampFromImgSrc(imgSrc)} />
      </div>
    );
  }
}

export default Frame;
