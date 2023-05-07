import "./TimelineFrame.css";
import React from "react";
import { getDateFromImgSrc, getTimeFromImgSrc } from "../../constants";


class TimelineFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realType: "",
    };
  }

  componentDidMount() {
    const { type } = this.props;
    if(!type.match(/(Unknown|Delivery)/g)) {
      this.setState({
        realType: "Family"
      })
    } else {
      this.setState({
        realType: type
      })
    }
  }

  render() {
    const images = require.context('../../../public/img/data_storage', true);
    const { imgSrc, imgId, type } = this.props; 
    const { realType } = this.state;

    const img = images(`./${imgSrc}.jpg`);
    const date = getDateFromImgSrc(imgSrc);
    const time = getTimeFromImgSrc(imgSrc);
    return (
      <div className={`timelineFrame frame-${realType}`} id={imgId}>
        <img src={`${img}`} alt="Test Frame" />
        <div className="timelineFrameDetails">
          <div className= "timelineAlbumText">
            <span className={`timelineAlbumType ${realType === "Family" ? "" : realType}`}>{type}</span>
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
