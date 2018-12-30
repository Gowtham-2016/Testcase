import React, { Component,Fragment } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import Header from './Header';
import {Link} from 'react-router-dom';
import Typist from 'react-typist';
import SpeechRecognition from 'react-speech-recognition';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
let responsiveVoice = window.responsiveVoice;

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
  }

class Home extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    listen(){
        console.log("listen")
        //e.preventDefault();
        if(this.props.listening){
          this.props.stopListening()
        }
        else if(!this.props.listening){
          this.props.startListening()
        }
      }
      componentDidMount(){
        responsiveVoice.speak("Hello, I’m B1 at your service. How can I help you?")
        console.log("did mount")
      }
      componentDidUpdate(){
          console.log('update')
        // if(this.props.finalTranscript==""){
        //     this.props.stopListening();
        // }
        if(this.props.finalTranscript!==""){
          console.log("in update")
          fetch("https://cors-anywhere.herokuapp.com/https://b1nlb3.herokuapp.com/B1NLP/api/v1.0/command/"+this.props.finalTranscript)
        .then(response => response.json())
        .then(data =>{
          console.log(data)
          if(data.Result.intent=="OrderFood"){
            if(typeof(data.Result.B1_response)=="string"){
                if(data.Result["RESTAURANT.NAME"]=="shake shack"){
                    console.log("Shake Shack")
                    this.props.history.push({
                        pathname: '/order',
                        state: { val:1,Food:(data.Result["FOOD.CATEGORY"]!=undefined?data.Result["FOOD.CATEGORY"]:"")  }
                      })
                }
                else if(data.Result["RESTAURANT.NAME"]=="plum market"){
                    console.log("plum market")
                    this.props.history.push({
                        pathname: '/order',
                        state: { val:3,Food:(data.Result["FOOD.CATEGORY"]!=undefined?data.Result["FOOD.CATEGORY"]:"")  }
                      })
                }
                else if(data.Result["RESTAURANT.NAME"]=="roasting plant" || data.Result["RESTAURANT.NAME"]=="roasting plant coffee"){
                    console.log("roasting")
                    this.props.history.push({
                        pathname: '/order',
                        state: { val:2,Food:(data.Result["FOOD.CATEGORY"]!=undefined?data.Result["FOOD.CATEGORY"]:"")  }
                      })
                }
                else if(data.Result["intent"]=="OrderFood"&& data.Result["FOOD.CATEGORY"]!=undefined){
                    this.props.history.push({
                        pathname: '/order',
                        state: { val:4,Food:data.Result["FOOD.CATEGORY"] }
                    })
                }
                else if(data.Result["intent"]=="OrderFood"){
                    this.props.history.push({
                        pathname: '/order',
                        state: { val:1  }
                    })
                }
              }
          }
          else{
            this.props.history.push("/delivery")
          }
          this.props.resetTranscript();
          this.props.stopListening();
        })
      }
    }
    onDelivery(e){
        e.preventDefault();
        this.props.history.push("/delivery")
    }
    render() {
        return (
            <Fragment>
            <Header />
                <Row style={{overflowX: "hidden", overflowY: "auto",background:"#111315"}}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Row>
                            <div style={{position: "absolute", top: '10%',left: '52%', transform: 'translate(-50%, -50%)'}}>
                                <Typist>
                                    <h1 style={{fontFamily:"Orbitron",color:"#6ed7e8",textAlign:"center"}}>Hello, I’m B1 at your service. How can I help you?</h1>
                                </Typist>
                            </div>
                           
                           
                            <Col lg={6} md={6} sm={12} xs={12} >
                             <img onClick={() => this.listen()} src={(this.props.listening) ? ("img/bin1on.png") : ("img/bin1off.png")} alt="b1" img-responsive />
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} >
                                <Col lg={12} md={12} sm={12} xs={12} style={{ marginTop: "250px"}}>
                                    <Link to="/order">
                                        <Card style={{ backgroundColor: "#272E32", width: "400px", height: "100px" }}>
                                            <h3 style={{ color: "#FFF", textAlign: "center", marginTop: "30px", letterSpacing: "6px" }}>ORDER</h3>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col  lg={12} md={12} sm={12} xs={12} style={{ marginTop: "30px"}}>
                                    <Card onClick={(e)=>this.onDelivery(e)} style={{ backgroundColor: "#272E32", width: "400px", height: "100px" }}>
                                        <h3 style={{ color: "#FFF", textAlign: "center", marginTop: "20px", letterSpacing: "6px" }}>DELIVERY</h3>
                                        <h5 style={{ color: "#57A3B0", textAlign: "center" }}>ETA 10:00AM</h5>
                                    </Card>
                                </Col>
                            </Col>
                            
                        </Row>
                    </Col>
                </Row>
            </Fragment>

        );
    }
}
Home.propTypes = propTypes
const options = {
  autoStart: false
}
export default withRouter(SpeechRecognition(options)(Home));
