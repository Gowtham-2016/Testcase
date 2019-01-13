/**
* Conversation UI
*/



import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { withRouter } from "react-router";
import Container from '../primitives/Container';
import UserInput from '../primitives/UserInput';
import Message from '../components/Message';
import MessageArea from '../primitives/MessageArea';
import Loading from '../components/Loading';
import SubmitButton from '../primitives/SubmitButton';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import swal from 'sweetalert2';
import autoBind from 'react-autobind';

let responsiveVoice = window.responsiveVoice;

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class Conversation2 extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      questions: props.questions.map(question => {
        return {
          ...question,
          sender: 'BOT',
        };
      }),
      questionNumber: 0,
      userInput: '',
      SuppliesClicked:0,
      disableUserInput: false,
      messages: [],
      answers: {},
      loadingBot: false,
      Item:"",
      showSuppliesImages:0,
      recording:0,
      Data:[],
      count:0,
      showFoodMenu:0,
      Error:0,
      showCategory:0,
      SelectedImage:"image",
      showStores:0,
      ShowAssistResults:0,
      courseType:"",
      showNursingImages:0,
    }
    this.sortProperties=this.sortProperties.bind(this);
  }
  onImageFocus(e, item) {
    var parent = this.getClosest(e.target, '.slick-list');
    parent.style.overflow = "inherit";
    let url = ('imageUrlsBySize' in item)?(item.imageUrlsBySize["90"]):("./img/not-found.png");
    // if('imageUrlsBySize' in item){
    //   if(url.substr(-1) === "c") {
    //     url = url.slice(-0,-4)+"360-c";
    //     console.log("c");
    //   } else {
    //     url = url.slice(-0,-2)+"360";
    //     console.log("normal");
    //   }
    // }
   
    e.target.src = url;
    let style = {
      background:'#fff',
      width: "200px",
      height: "200px",
      position: "absolute",
      margin: "-20px"
    }
    Object.assign(e.target.style ,style);    
  }
  onImageUnFocus(e, item) {
    var parent = this.getClosest(e.target, '.slick-list');
    parent.style.overflow = "hidden";
    let url = ('imageUrlsBySize' in item)?(item.imageUrlsBySize["90"]):("./img/not-found.png");
    // if('imageUrlsBySize' in item){
    //   if(url.substr(-1) === "c") {
    //     url = url.slice(-0,-4)+"180-c";
    //     console.log("c");
    //   } else {
    //     url = url.slice(-0,-2)+"180";
    //     console.log("normal");
    //   }
    // }
   
    e.target.src = url;
    let style = {
      width: "150px",
      height: "150px",
      position: "initial",
      margin: 0
    }
    Object.assign(e.target.style ,style);    
  }
  getClosest = function (elem, selector) {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.matches( selector ) ) return elem;
    }
    return null;
  };
  componentWillMount() {
    console.log("will mount")
    const { questions, questionNumber } = this.state;
    this.setState({
      ...this.state,
      messages: [
        questions[questionNumber],
      ]
    })
    
  }
  componentDidMount(){
    responsiveVoice.speak(this.state.questions[0].text)
    console.log("did mount")
    document.getElementById("userInput").focus();
    let input = document.getElementById("userInput");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("submitButton").click();
      }
    });
  }
  
  listen(e){
    e.preventDefault();
    document.getElementById("userInput").focus();
    console.log("listen")
    //e.preventDefault();
    if(this.props.listening){
      this.props.stopListening()
    }
    else {
      this.props.startListening()
    }
  }

  handleUserInput(e) {
    console.log(e.target.value,"onchange")
    this.props.resetTranscript()
    e.preventDefault();
    console.log(this.state.questions[this.state.questionNumber].key)
    this.props.handleUserInput(e.target.value,this.state.questions[this.state.questionNumber].key);
    this.setState({
      userInput: e.target.value,
    })
  }

  componentWillReceiveProps(props,nextProps){
    let that= this;
    if(props.Arrived==1 && this.state.count < 1){
     this.setState({
       count:this.state.count+1
     })
     this.nextQuestion()
    //  setTimeout(function(){
    //    that.nextQuestion()
    //  },2000)
    }
  }

  sortProperties(obj){
    // convert object into array
    var sortable=[];
    for(var key in obj)
      if(obj.hasOwnProperty(key))
        sortable.push([key, obj[key]]); // each item is an array in format [key, value]
    
    // sort items by value
    sortable.sort(function(a, b)
    {
      return a[1]-b[1]; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }


  
  handleButtonSelect(select) {
    console.log("Button select",select)
    if(select.key=="temp"){
      let restaurent;
      if(select.value==1){
        restaurent="40°";
      }
      else if(select.value==2){
        restaurent="50°";
      }
      else if(select.value==3){
        restaurent="60°";
      }
      else{
        restaurent="Yummly"
      }
      console.log("Restaurent selected",select);
      this.props.buttonSelect(select.value);
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: select.text,
            type: 'USER'
          }
        ],
        answers: this.state.questions[this.state.questionNumber].key ? {
          ...this.state.answers,
          [this.state.questions[this.state.questionNumber].key]: select.value,
        } : {
          ...this.state.answers,
        },
        questions:[
          ...this.state.questions,
          {
            text: "Temperature of Bin 1 has been set to "+restaurent,
            sender: 'BOT',
            key: 'category',
            buttons: [{
              text: 'Back',
              key: 'Back',
              value: 'Back',
            }]
          }
        ]
      },() => {
          this.nextQuestion();
      })
    }
    else if(select.key=="Back"){
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: select.text,
            type: 'USER'
          }
        ],
        questions:[
          ...this.state.questions,
          {
            text: "OK, please put your package in bin number 1 and set the temperature.",
            key: 'temp',
            sender:"BOT",
            buttons: [{
                text: '40°',
                key: 'temp',
                value: '1',
              }, {
                text: '50°',
                key: 'temp',
                value: '2',
              }, {
                text: '60°',
                key: 'temp',
                value: '3',
              }]}
      ],
        answers: this.state.questions[this.state.questionNumber].key ? {
          ...this.state.answers,
          [this.state.questions[this.state.questionNumber].key]: select.value,
        } : {
          ...this.state.answers,
        }
      },() => {
        this.nextQuestion();
    })
    }
   
    // if(select.value=="continue"){
    //   console.log('new loop')
    //   //loop again
    
    // }
    // else if(select.value=="Deliver"&&this.state.SuppliesClicked){
    //   console.log('insert Deliver questions');
    //   //loop again
    //   let QuestionsArray = this.state.questions;
    //   QuestionsArray.splice(this.state.questionNumber+1,0,{
    //     text: 'For more selection, please tap on the buttons below :',
    //     sender: 'BOT',
    //     key: 'OrderItems',
    //   },
    //   {
    //     text: 'Please Enter or speak the Quantity That you would like to order',
    //     sender: 'BOT',
    //     key: 'Quantity',
    //   },
    //   {
    //     text: 'Please Enter or speak the Room Number that you are admitted in',
    //     sender: 'BOT',
    //     key: 'RoomNumber',
    //   },
    //   {
    //     text: 'Your Order has been placed, Would you like to order anything else?',
    //     sender: 'BOT',
    //     key: 'OrderPlaced',
    //     buttons:[{
    //       text: 'Yes',
    //       value: 'Deliver',
    //     },{
    //       text: 'Main Menu',
    //       value: 'continue',
    //     }]
    //   })
    //   if(this.state.questions[this.state.questions.length-1].key=="pickup"){
    //     this.setState({
    //       question:this.state.questions.pop()
    //     })
    //   }
    //   if(this.state.SuppliesClicked===1){
    //     console.log("supplies clicked is 1")
    //     this.setState({
    //       showSuppliesImages:1,
    //       messages: [
    //         ...this.state.messages,
    //         {
    //           text: select.text,
    //           type: 'USER'
    //         }
    //       ],
    //       answers: this.state.questions[this.state.questionNumber].key ? {
    //         ...this.state.answers,
    //         [this.state.questions[this.state.questionNumber].key]: select.value,
    //       } : {
    //         ...this.state.answers,
    //       },
    //       questions:QuestionsArray
    //     },() => {
    //         this.nextQuestion();
    //     })
    //   }
    // }
    // else if(select.value=="goback"){
    //   console.log('new loop')
    //   //loop again
    //   this.setState({
    //     showFoodMenu:0,
    //     showDrinkMenu:0,
    //     showNursingImages:1,
    //     messages: [
    //       ...this.state.messages,
    //       {
    //         text: select.text,
    //         type: 'USER'
    //       }
    //     ],
    //     answers: this.state.questions[this.state.questionNumber].key ? {
    //       ...this.state.answers,
    //       [this.state.questions[this.state.questionNumber].key]: select.value,
    //     } : {
    //       ...this.state.answers,
    //     },
    //     questionNumber:this.state.questionNumber-3
    //   },() => {
    //       this.nextQuestion();
    //   })
    // }
    // else{
    //   console.log("Else condition")
    //   this.setState({
    //     messages: [
    //       ...this.state.messages,
    //       {
    //         text: select.text,
    //         type: 'USER'
    //       }
    //     ],
    //     answers: this.state.questions[this.state.questionNumber].key ? {
    //       ...this.state.answers,
    //       [this.state.questions[this.state.questionNumber].key]: select.value,
    //     } : {
    //       ...this.state.answers,
    //     },
    //   }, () => {
    //       this.nextQuestion();
    //   })
        
      
    // }
   
  
    console.log(this.state.questions)
  }

  nextQuestion() {
    console.log("next question")
    this.setState({
      userInput:"",
      questionNumber:this.state.questionNumber + 1,
      loadingBot: false,
    }, () => {
      if (this.state.questionNumber < this.state.questions.length) {
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.state.questions[this.state.questionNumber],
            ],
            loadingBot: false,
          })
          // var msg = new SpeechSynthesisUtterance(this.state.questions[this.state.questionNumber].text);
          // window.speechSynthesis.speak(msg);
          responsiveVoice.speak(this.state.questions[this.state.questionNumber].text)
          if (this.state.questions[this.state.questionNumber].buttons) {
            this.setState({
              disableUserInput: false
            });
          } else if(this.state.questionNumber==this.state.questions.length){
            this.setState({
              disableUserInput: false
            });
            this.userInput.focus();
          }
        });
        if(this.state.questions[this.state.questionNumber].key=="Unlocked"){
          let that=this;
          setTimeout(function(){
            that.nextQuestion();
          },3000)
       
        }
      } 
      // else {
      //   setTimeout(() => {
      //     this.setState({
      //       messages: [
      //         ...this.state.messages,
      //         this.finalMessage(),
      //       ],
      //       loadingBot: false,
      //       disableUserInput: true,
      //     });
      //     this.props.onEnded(this.state.answers)
      //   }, 500);
      // }
    })
  }

  checkButtons(Buttons){
    console.log("matching buttons",Buttons,this.state.userInput)
    let Yes = 0;
    Buttons.map((button,i)=>{
      console.log(i)
      if(((this.state.userInput).toLowerCase()).includes((button.text).toLowerCase())){
        Yes = 1
        this.handleButtonSelect(button)
      }
    },()=>{
      console.log(Yes,"matched")
      
    })
    return Yes
  }

  submitUserInput(e) {
    if(this.props.listening){
      this.props.stopListening();
    }
    
    if(this.state.userInput.length>0){
     
          console.log("onSubmit");
      console.log(this.state.userInput,"input");
      this.props.Unlock(this.state.userInput,this.state.questions[this.state.questionNumber].key);
        if(this.state.userInput.indexOf("40")>-1||this.state.userInput.indexOf("50")>-1 ||this.state.userInput.indexOf("60")>-1){
          this.props.Unlock(this.state.userInput);
          this.setState({
              messages: [
                ...this.state.messages,
                {
                  text: this.state.userInput,
                  type: 'USER'
                }
              ],
              answers: this.state.questions[this.state.questionNumber].key ? {
                ...this.state.answers,
                [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
              } : {
                ...this.state.answers,
              },
              questions:[
                ...this.state.questions,
                {
                  text: "Temperature of Bin 1 has been set to "+this.state.userInput +" °",
                  sender: 'BOT',
                  key: 'category',
                  buttons: [{
                    text: 'Back',
                    key: 'Back',
                    value: 'Back',
                  }]
                }
              ]
            },() => {
                this.nextQuestion();
            })
        }
        else if(this.state.userInput=="back"){
            console.log("BACKA")
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: "back",
                type: 'USER'
              }
            ],
            questions:[
              ...this.state.questions,
              {
              text: "OK, please put your package in bin number 1 and set the temperature.",
              key: 'temp',
              sender:"BOT",
              buttons: [{
                  text: '40°',
                  key: 'temp',
                  value: '1',
                }, {
                  text: '50°',
                  key: 'temp',
                  value: '2',
                }, {
                  text: '60°',
                  key: 'temp',
                  value: '3',
                }]}
          ],
            answers: this.state.questions[this.state.questionNumber].key ? {
              ...this.state.answers,
              [this.state.questions[this.state.questionNumber].key]: "back",
            } : {
              ...this.state.answers,
            }
          },() => {
            this.nextQuestion();
        })
        }
        else if(this.state.questions[this.state.questionNumber].key=="PASSCODE"&&this.state.userInput!=="99999"){
            this.setState({
              loadingBot: false,
              messages: [
                ...this.state.messages,
                {
                  text: this.state.userInput,
                  type: 'USER'
                }
              ],
              questionNumber:this.state.questionNumber-1,
              questions:this.props.questions.map(question => {
                return {
                  ...question,
                  sender: 'BOT',
                };
              }),
              answers: this.state.questions[this.state.questionNumber].key ? {
                ...this.state.answers,
                [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
              } : {
                ...this.state.answers,
              },
              userInput: '',
              loadingBot: true,
            },()=>{
              this.setState({
                userInput:""
              },()=>{
              this.nextQuestion()
              })
            })
          
          
        }
        else{
          this.setState({
            loadingBot: false,
            messages: [
              ...this.state.messages,
              {
                text: this.state.userInput,
                type: 'USER'
              }
            ],
            answers: this.state.questions[this.state.questionNumber].key ? {
              ...this.state.answers,
              [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
            } : {
              ...this.state.answers,
            },
            userInput: '',
            loadingBot: true,
          },()=>{
            this.setState({
              userInput:""
            },()=>{
             
            this.nextQuestion()
            })
          })
        }
      
    }
  
  }
  componentDidUpdate(){
    console.log(this.props.listening);
   
    if(document.getElementById("frame")){
      var objDiv = document.getElementById("frame");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  if(this.props.finalTranscript!==""){
      console.log("in update")
      if(this.state.userInput!=""){
        this.props.resetTranscript();
        this.submitUserInput();
      }
      else{
        this.setState({
          userInput: this.props.finalTranscript
        })
      }
      document.getElementById("userInput").value=this.state.userInput
    }
  }
  next() {
    this["slider"].slickNext();
  }
  previous() {
    this["slider"].slickPrev();
  }
  render() {
    const { transcript, startListening,resetTranscript, browserSupportsSpeechRecognition,finalTranscript  } = this.props
  

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    const { messages, userInput, answers, disableUserInput } = this.state;

    var settings = {
      dots: false,
      lazyLoad: false,
      infinite: false,
      autoplay: false,
      speed: 500,
      rtl: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      //initialSlide: 0,
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //       infinite: true,
      //     }
      //   },
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //       initialSlide: 2
      //     }
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1
      //     }
      //   }
      // ]
    };
    
      return (
        <ThemeProvider theme={this.props.theme || theme}>
          
          <Container style={{height:"100%",background: "#14191c"}}>
          <div style={{background:"#000",float:"left"}}></div>
              <div style={{height:'90%'}}>
              <MessageArea style={{height:"75vh"}} id="frame"
              innerRef={div => this.messageArea = div }
            >
           <span style={{height: "400px"}}>
            {messages.map((message, index) =>
              <Message
                image={this.state.SelectedImage}
                key={index}
                message={message}
                answers={answers}
                onButtonSelect={this.handleButtonSelect}
                active={messages.length === index + 1}
              />
            )}
            {this.state.loadingBot && <Loading bot/>}
            {this.state.userInput.length > 0 && <Loading user/>}
        
           

          </span>
     
            </MessageArea>
            {/* <div className="userInput row">
            <form className="inputForm" onSubmit={(e) => this.submitUserInput(e)}>
            <img className="audio-button" onClick={() => this.listen()} src={(this.props.listening) ? ("img/mic_on.png") : ("img/mic_off.png")}/>
              <UserInput
                className="textInput"
                type="text"
                ref="text"
                id="userInput"
                value={userInput}
                innerRef={input => this.userInput = input }
                onChange={e => this.handleUserInput(e)}
                //disabled={this.state.key||this.state.ShowAssistResults||this.state.showFoodMenu||this.state.showDrinkMenu||this.state.showStores}
              />
               <SubmitButton className="submitButton"><img src="img/send.png"/></SubmitButton>
              <div>
             </div>
            </form>
            
            </div> */}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
            <div className="row">
            <div className="col-2 text-center p-0" style={{marginRight: "-20px"}}>
            <form className="inputForm"></form>
            <img className="audio-button" onClick={(e) => this.listen(e)} src={(this.props.listening) ? ("img/mic_on.png") : ("img/mic_off.png")}/>
            </div>
            <div className="col-8 text-center p-0" >
            <UserInput
                className="textInput"
                type="text"
                ref="text"
                id="userInput"
                value={userInput}
                innerRef={input => this.userInput = input }
                onChange={e => this.handleUserInput(e)}
                //disabled={this.state.key||this.state.ShowAssistResults||this.state.showFoodMenu||this.state.showDrinkMenu||this.state.showStores}
              />     
            </div>
            <div className="col-2 text-center p-0" style={{ marginLeft: "-10px"}}>
            <SubmitButton onClick={this.submitUserInput} id="submitButton" className="submitButton"><img src="img/send.png"/></SubmitButton>            </div>
            </div>
                       
            </div>
              </div>
            
            
          </Container>
        </ThemeProvider>
      )
  }
}

Conversation2.propTypes = propTypes
const options = {
  autoStart: false
}

export default SpeechRecognition(options)(withRouter(Conversation2));
