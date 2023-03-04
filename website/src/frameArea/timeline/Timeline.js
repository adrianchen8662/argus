/* eslint react/destructuring-assignment: 0 */
/* eslint class-methods-use-this: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import "./Timeline.css";
import React from "react";
import { connect } from "react-redux";
import { ReactComponent as Left } from "../../statics/Left.svg";
import { ReactComponent as Right } from "../../statics/Right.svg";
import TimelineEvent from "./TimelineEvent";
import { frameDetails } from "../../statics/testDetails"
// import { incrementEvent, decrementEvent } from "../../redux/actions";
// import { getCurrentEvent } from "../../redux/selectors";

const timelineFrames = frameDetails.frames.reverse().map((frame) => <TimelineEvent eventType={frame.type} timestamp={frame.timestamp} />);

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.state = {
      totalFrames: timelineFrames.length - 1
    }
  }

  handleMoveRight () {
    // const { currentEvent } = this.state;
    if(this.props.currentEvent.currentEvent < 0) {
      this.props.incrementEvent();
    }
  }

  handleMoveLeft () {
    const { totalFrames } = this.state;
    if(this.props.currentEvent.currentEvent > -totalFrames) {
      this.props.decrementEvent();
    }
  }

  render() {
    const { currentEvent } = this.props;
    return (
      <div id="timeline">
        <Left className="timelineArrow" onClick={this.handleMoveLeft}/>
        {timelineFrames[-currentEvent.currentEvent]}
        <Right className="timelineArrow" onClick={this.handleMoveRight}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // return {
    incrementEvent: () => dispatch({ type: "INCREMENT_EVENT"}),
    decrementEvent: () => dispatch({ type: "DECREMENT_EVENT"})
  // }
});

const mapStateToProps = state => ({
  currentEvent: state.currentEvent
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
