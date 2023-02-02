import './App.css';
import React from 'react';
import Header from './header/Header';
import FrameArea from './frameArea/FrameArea';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <FrameArea />
      </>
    );
  }
}

export default App;
