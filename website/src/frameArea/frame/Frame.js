import "./Frame.css";
import React from "react";
import TimelineEvent from "./timeline/TimelineEvent";
import { getTimestampFromImgSrc, apiHost } from "../../constants";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frameConf: -1,
      frameStatus: null,
      frameMemberID: null
    };
  }

  componentDidMount() {
    const { imgSrc } = this.props;
    const that = this;
    try {
      fetch(`${apiHost}/getmetadata?timestamp=${imgSrc}`, {
        method: "GET",
      }).then((res) => res.json())
      .then((resJSON) => { 
        console.log("CalledMeta", resJSON);
        that.setState({
          frameConf: resJSON.confidence,
          frameStatus: resJSON.Identification,
          frameMemberID: resJSON["Compreface ID"],
        })
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevProps) {
    const { imgSrc } = this.props;
    
    if(imgSrc !== prevProps.imgSrc){
      const that = this;
      try {
        fetch(`${apiHost}/getmetadata?timestamp=${imgSrc}`, {
          method: "GET",
        }).then((res) => res.json())
        .then((resJSON) => { 
          console.log("CalledMeta", resJSON);
          that.setState({
            frameConf: resJSON.confidence,
            frameStatus: resJSON.Identification,
            frameMemberID: resJSON["Compreface ID"],
          })
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  
  render() {
    const images = require.context('../../../public/img/data_storage', true);
    const { imgSrc, familyList } = this.props; 
    const { frameConf, frameStatus, frameMemberID } = this.state;
    console.log("imgSrc", imgSrc)
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
