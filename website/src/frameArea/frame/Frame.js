import "./Frame.css";
import React from "react";

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const images = require.context('../../../public/img/data_storage', true);
    const { imgSrc, imgId, type } = this.props; 
    const img = images(`./${imgSrc}.jpg`);
    // const date = getDateFromImgSrc(imgSrc);
    // const time = getTimeFromImgSrc(imgSrc);
    return (
      <div className={`frame frame-${type}`} id={imgId}>
        <img src={`${img}`} alt="Test Frame" />
      </div>
    );
  }
}

export default Frame;
