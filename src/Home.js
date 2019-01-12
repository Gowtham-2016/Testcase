import React, { Component,Fragment } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import Header from './Header';
import {Link} from 'react-router-dom';
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
 


  class Typer extends React.Component {
  
    static defaultProps = {
      heading: '',
      dataText: []
    }
  
    constructor(props) {
      super(props);
  
      this.state = {
        dataText:props.dataText[0],
        text: '',
        typingSpeed: 50
      }
    }
    
    // static getDerivedStateFromProps(props,state){
    //     if(props.dataText[0]!==state.text){
    //         return {
    //             text:""
    //         }
    //     }
    // }
    
    componentDidMount() {
      this.handleType();
    }
    
    handleType = () => {
      let { dataText } = this.props;
      let { text, typingSpeed , count } = this.state;
      let fullText = dataText[0];
  
      this.setState({
        text: dataText[0].substring(0, this.state.text.length + 1),
        typingSpeed: 50
      });
      
      setTimeout(this.handleType, typingSpeed);
     
    };
  
    render() {    
      return (
        <h2 style={{fontFamily:"Orbitron",color:"#6ed7e8",textAlign:"center"}}>
             
        <span>{ this.state.text }</span>
        <span id="cursor"/>
        </h2>
      );
      
    }
  }


 
class Home extends Component {
    constructor(){
        super();
        this.state = {
            response:"Hello, I’m B1 at your service. How can I help you?"
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
  
        responsiveVoice.speak(this.state.response)
        console.log("did mount")
      }
    //   static getDerivedStateFromProps(props, state){
    //       if(this.state.response!==state.response){
    //           return {
    //               ...state,
    //               response:state.response
    //           }
    //       }
    //       else{
    //           return null
    //       }
    //   }
      componentDidUpdate(){
          console.log('update')
        // if(this.props.finalTranscript==""){
        //     this.props.stopListening();
        // }
        if(this.props.finalTranscript!==""){
          console.log("in update")
          fetch("https://cors-anywhere.herokuapp.com/https://b1nlp33.herokuapp.com/B1NLP/api/v1.0/command/"+this.props.finalTranscript)
        .then(response => response.json())
        .then(data =>{
          console.log(data);
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
          else if(data.Result.intent == "Open" || data.Result.intent == "Close" || data.Result.intent == "Lock" || data.Result.intent == "Unlock"){
            console.log("DELIVERY")
            this.props.history.push("/Delivery")
          }
          else if(data.Result.intent !== "Delivery" ){
            this.setState({
                response:data.Result.B1_response
            })
            responsiveVoice.speak(data.Result.B1_response)
           // this.forceUpdate();
          }
          else{
            this.props.history.push("/DeliveryPickUp")
          }
          this.props.resetTranscript();
          this.props.stopListening();
        })
      }
    }
    onDelivery(e){
        e.preventDefault();
        this.props.history.push("/DeliveryPickUp")
    }
    render() {
        return (
            <Fragment>
            <Header />
                <Row style={{overflowX: "hidden", overflowY: "auto",background:"#111315"}}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Row>
                            <div style={{height:"auto",width:"80%",position: "absolute", top: '10%',left: '52%', transform: 'translate(-50%, -50%)'}}>
                            <Typer
                                dataText={[this.state.response]} 
                            />
                            </div>
                            <Col lg={6} md={6} sm={12} xs={12} >
                             <img onClick={() => this.listen()} src={(this.props.listening) ? ("img/bin1on.png") : ("img/bin1off.png")} alt="b1" img-responsive />
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} >
                                <Col lg={12} md={12} sm={12} xs={12} style={{ marginTop: "250px"}}>
                                    <Link style={{textDecoration:"none"}} to="/order">
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
