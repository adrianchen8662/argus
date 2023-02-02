import './Header.css';
import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="header">
        <h1>Argus</h1>
      </div>
    );
  }
}

export default Header;
