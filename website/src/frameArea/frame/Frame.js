import './Frame.css';
import React from 'react';

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="frame">
        <img src="https://dummyimage.com/640x480/000/f2b780" alt="Test Frame" />
      </div>
    );
  }
}

export default Frame;