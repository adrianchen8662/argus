import "./TimelineFrame.css";
import React from "react";
import { getDateFromImgSrc, getTimeFromImgSrc } from "../../constants";


class TimelineFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const images = require.context('../../../public/img/data_storage', true);
    const { imgSrc, imgId, type } = this.props; 
    const img = images(`./${imgSrc}.jpg`);
    const date = getDateFromImgSrc(imgSrc);
    const time = getTimeFromImgSrc(imgSrc);
    return (
      <div className={`timelineFrame frame-${type}`} id={imgId}>
        <img src={`${img}`} alt="Test Frame" />
        <div className="timelineFrameDetails">
          <div className= {`timelineAlbumText ${type}`}>
            <span className="timelineAlbumType">{type}</span>
            <div className="timelineAlbumFrameTimeContainer">
              <span className="timelineAlbumTime timelineAlbumDate">{date}</span>
              <span className="timelineAlbumTime">{time}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineFrame;
