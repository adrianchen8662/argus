import "./Frame.css";
import React from "react";
import TimelineEvent from "./timeline/TimelineEvent";
import { getTimestampFromImgSrc } from "../../constants";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  
  render() {
    const images = require.context('../../../public/img/data_storage', true);
    const { imgSrc, imgId, type, familyList } = this.props; 
    const img = images(`./${imgSrc}.jpg`);
    return (
      <div className={`frame frame-${type}`} id={imgId}>
        <img src={`${img}`} alt="Test Frame" />
        <TimelineEvent familyList={familyList} eventType={type} timestamp={getTimestampFromImgSrc(imgSrc)} />
      </div>
    );
  }
}

export default Frame;
