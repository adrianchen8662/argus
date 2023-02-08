import "./Header.css";
import React from "react";
import { ReactComponent as Family } from "../statics/People.svg";
import { ReactComponent as Info } from "../statics/Info.svg";
import { ReactComponent as Close } from "../statics/Xmark.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoModal: false,
    };
  }


  render() {
    const { infoModal } = this.state;
    return (
      <>
        {infoModal && <div className="ModalScreen"> 
            <div className="Modal">
              <div className="modalHeader">
                <h1>Information</h1>
                <Close id="closeButton" onClick={() => this.setState({infoModal: false})}/>
              </div>
              <hr />
            </div>
          </div>}
        <div id="header">
          <div id="familyButtonContainer">
            <Family id="familyButton" />
          </div>
          <h1>Argus</h1>
          <div id="infoButtonContainer">
            <Info id="infoButton" onClick={() => this.setState({infoModal: true})} />
          </div>
        </div>
      </>
    );
  }
}

export default Header;
