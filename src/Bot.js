import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";

import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import Conversation from './containers/Conversation';
// import "./App.css";

const styles = theme => ({
  root: {
      width: '100%',
  },
  heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
  },
  secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
  },
});

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Bot extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      recording: 0
    })
  }
  listen() {
    if (this.state.recording) {
      this.props.stopListening()
      this.setState({ recording: 0 })
    }
    else {
      this.props.startListening()
      this.setState({ recording: 1 })
    }

  }
  componentDidUpdate() {
    if (this.state.finalTranscript != undefined) {
      this.refs.text.value = this.state.finalTranscript
    }
  }

  render() {
    const theme = {
      blobColor: '#1f2528',
      userBlobColor: '#73b5c5',
      user: <img style={{ height: 40 }} src="img/user.png" />,
      bot: <img style={{ height: 40 }} src="img/Belix1.png" />,
      // user: "",
      // bot: "",
      baseColor: '#ccc',
      width: '500px',
    };
    let questions = [{
      text: "Cool, here are options from the restaurants nearby",
      key: 'restaurents',
      buttons: [{
        text: 'Shake Shack',
        key: 'restaurents',
        value: '1',
      }, {
        text: 'Roasting Plant',
        key: 'restaurents',
        value: '2',
      }, {
        text: 'Plum Market',
        key: 'restaurents',
        value: '3',
      }, {
        text: 'Yummly',
        key: 'restaurents',
        value: '4',
      }]
    }
    // , {
    //   text: 'Please Select one of Items from the Menu',
    //   key: 'Menu',
    //   buttons: [{
    //     text: 'Burger',
    //     key: 'Burger',
    //     value: 'Burger',
    //   }, {
    //     text: 'Chicken',
    //     key: 'Chicken',
    //     value: 'Chicken',
    //   }, {
    //     text: 'Snacks',
    //     key: 'Snacks',
    //     value: 'Snacks',
    //   }]
    // }, {
    //   text: 'For more selection, please tap on the buttons below :',
    //   key: 'courseType',
    //   buttons: [{
    //     text: 'Track',
    //     key: 'Track',
    //     value: 'Track',
    //   }, {
    //     text: 'Pick up',
    //     key: 'Pickup',
    //     value: 'Pickup',
    //   }, {
    //     text: 'Deliver',
    //     key: 'Deliver',
    //     value: 'Deliver',
    //   }]
    // },
    // {
    //   text: 'Please pick up the medication',
    //   key: 'pickup',
    //   buttons: [{
    //     text: 'Back',
    //     value: 'goback',
    //   }, {
    //     text: 'Main Menu',
    //     value: 'continue',
    //   }]
    // }
  ];

    let { transcript, startListening, resetTranscript, browserSupportsSpeechRecognition, finalTranscript } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    function getUserAnswers(answers) {
      console.log('answers', answers);
    }
    return (
      <div style={{width:'100%'}}>
        <div style={{background:"rgba(20, 25, 28, 0)"}}>
          <Conversation
            getyummly={this.props.getyummly}
            buttonSelect={this.props.buttonSelect}
            questions={questions}
            onEnded={getUserAnswers}
            theme={theme}
          />
        </div>
      </div>
    )
  }
}

Bot.propTypes = propTypes
const options = {
  autoStart: false
}

export default SpeechRecognition(options)(withStyles(styles, { withTheme: true })(Bot))