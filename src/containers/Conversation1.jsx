/**
* Conversation UI
*/



import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

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

class Conversation1 extends Component {
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
  }
  listen(){
    document.getElementById("userInput").focus();
    console.log("listen")
    //e.preventDefault();
    if(this.props.listening){
      this.props.stopListening()
    }
    else if(!this.props.listening){
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
    e.preventDefault();
    console.log("onSubmit");
    console.log(this.state.userInput,"input");
    this.props.Unlock(this.state.userInput);
      if(this.props.listening){
        this.props.stopListening();
      }
      // if(this.state.userInput=="supplies"){
      //   this.setState({
      //     SuppliesClicked:1,
      //     showNursingImages:0,
      //     messages: [
      //       ...this.state.messages,
      //       {
      //         text: "supplies",
      //         type: 'USER'
      //       }
      //     ],
      //     answers: this.state.questions[this.state.questionNumber].key ? {
      //       ...this.state.answers,
      //       [this.state.questions[this.state.questionNumber].key]: "supplies",
      //     } : {
      //       ...this.state.answers,
      //     }
      //   },() => {
      //       this.nextQuestion();
      //   })
      // }
      // else if(this.state.userInput=="blankets" || this.state.userInput=="blanket" || this.state.userInput=="bed sheets" ||  this.state.userInput=="bed sheet" || this.state.userInput=="bandages" || this.state.userInput=="IV"){
      //   this.setState({
      //     showSuppliesImages:0,
      //     messages: [
      //       ...this.state.messages,
      //       {
      //         text: this.state.userInput,
      //         type: 'USER'
      //       }
      //     ],
      //     answers: this.state.questions[this.state.questionNumber].key ? {
      //       ...this.state.answers,
      //       [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
      //     } : {
      //       ...this.state.answers,
      //     }
      //   },() => {
      //       this.nextQuestion();
      //   })
      // }
      // else if((this.state.userInput=="deliver" || this.state.userInput=="yes")&&this.state.SuppliesClicked==1){
      // console.log('insert Deliver questions');
      // //loop again
      // let QuestionsArray = this.state.questions;
      // QuestionsArray.splice(this.state.questionNumber+1,0,{
      //   text: 'For more selection, please tap on the buttons below :',
      //   sender: 'BOT',
      //   key: 'OrderItems',
      // },
      // {
      //   text: 'Please Enter or speak the Quantity That you would like to order',
      //   sender: 'BOT',
      //   key: 'Quantity',
      // },
      // {
      //   text: 'Please Enter or speak the Room Number that you are admitted in',
      //   sender: 'BOT',
      //   key: 'RoomNumberr',
      // },
      // {
      //   text: 'Your Order has been placed, Would you like to order anything else?',
      //   sender: 'BOT',
      //   key: 'RoomNumberr',
      //   buttons:[{
      //     text: 'Yes',
      //     value: 'Deliver',
      //   },{
      //     text: 'Main Menu',
      //     value: 'continue',
      //   }]
      // })
      // if(this.state.questions[this.state.questions.length-1].key=="pickup"){
      //   this.setState({
      //     question:this.state.questions.pop()
      //   })
      // }
      // if(this.state.SuppliesClicked===1){
      //   console.log("supplies clicked is 1")
      //   this.setState({
      //     showSuppliesImages:1,
      //     messages: [
      //       ...this.state.messages,
      //       {
      //         text: "Deliver",
      //         type: 'USER'
      //       }
      //     ],
      //     answers: this.state.questions[this.state.questionNumber].key ? {
      //       ...this.state.answers,
      //       [this.state.questions[this.state.questionNumber].key]: "Deliver",
      //     } : {
      //       ...this.state.answers,
      //     },
      //     questions:QuestionsArray
      //   },() => {
      //       this.nextQuestion();
      //   })
      // }
      // }
      // else if(this.state.userInput=="main menu"){
      //   this.setState({
      //     showFoodMenu:0,
      //     showDrinkMenu:0,
      //     ShowAssistResults:0,
      //     SuppliesClicked:0,
      //     showCategory:1,
      //     messages: [
      //       ...this.state.messages,
      //       {
      //         text: "main menu",
      //         type: 'USER'
      //       }
      //     ],
      //     answers: this.state.questions[this.state.questionNumber].key ? {
      //       ...this.state.answers,
      //       [this.state.questions[this.state.questionNumber].key]: "main menu",
      //     } : {
      //       ...this.state.answers,
      //     },
      //     questions:[
      //       ...this.state.questions,
      //       {
      //         text: "What else would you like to try :",
      //         sender: 'BOT',
      //         key: 'category',
              
      //       }, {
      //         text: 'Please Select one of the options below :',
      //         sender: 'BOT',
      //         key: 'categories',
             
      //       }, {
      //         text: 'For more selection, please tap on the buttons below :',
      //         sender: 'BOT',
      //         key: 'courseType',
      //         buttons: [{
      //           text: 'Track',
      //           key: 'Track',
      //           value: 'Track',
      //         }, {
      //           text: 'Pick up',
      //           key: 'Pickup',
      //           value: 'Pickup',
      //         }, {
      //           text: 'Deliver',
      //           key: 'Deliver',
      //           value: 'Deliver',
      //         }]
      //       },
      //       {
      //         text: 'Please pick up the medication',
      //         sender: 'BOT',
      //         key: 'pickup',
      //         buttons: [{
      //           text: 'Back',
      //           value: 'goback',
      //         },{
      //           text: 'Main Menu',
      //           value: 'continue',
      //         }]
      //       }
      //     ]
      //   },() => {
      //       this.nextQuestion();
      //   })
      // }
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
    //   else if ((this.state.userInput.length > 0 || this.props.finalTranscript.length > 0)) {
    //     console.log(this.state.questions[this.state.questionNumber].key)
    //     fetch("https://cors-anywhere.herokuapp.com/https://b1nlb3.herokuapp.com/B1NLP/api/v1.0/command/"+this.state.userInput)
    //     .then(response => response.json())
    //     .then(data =>{
    //       console.log(data)
    //       if(typeof(data.Result.B1_response)=="string"){
    //         if(data.Result["RESTAURANT.NAME"]=="Shake Shack"){
    //           this.props.buttonSelect(1);
    //         }
    //         else if(data.Result["RESTAURANT.NAME"]=="plum market"){
    //           this.props.buttonSelect(3);
    //         }
    //         else if(data.Result["RESTAURANT.NAME"]=="roasting plant" || "roasting plant coffee"){
    //           this.props.buttonSelect(2);
    //         }
    //         let Response=data.Result.B1_response;
    //         let QuestionsArray = this.state.questions;
    //         QuestionsArray.splice(this.state.questionNumber+1,0,{
    //           text: Response, 
    //           sender: 'BOT',
    //           key: 'OrderItems',
    //           buttons: [{
    //             text: 'Back',
    //             value: 'Back',
    //             key:"Back"
    //           }]
    //         })
    //         this.setState({
    //           loadingBot: false,
    //           messages: [
    //             ...this.state.messages,
    //             {
    //               text: this.state.userInput,
    //               type: 'USER'
    //             }
    //           ],
    //           answers: this.state.questions[this.state.questionNumber].key ? {
    //             ...this.state.answers,
    //             [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
    //           } : {
    //             ...this.state.answers,
    //           },
    //           questions:QuestionsArray,
    //           showCategory:0,
    //           showNursingImages:0,
    //           showSuppliesImages:0,
    //           userInput: '',
    //           loadingBot: true,
    //         },()=>{
    //           this.setState({
    //             userInput:""
    //           },()=>{this.props.resetTranscript()
    //           this.nextQuestion()
    //           })
    //         })
    //       }
    //       // else{
    //       //   console.log('else');
    //       //   let QuestionsArray = this.state.questions;
    //       //   let response = <div>Discharge Instructions :<br/>
    //       //   {data.Result.response[0].instructions.map((res,i)=>{
    //       //       return <p key={i} style={{fontSize:13}}>&nbsp;&nbsp;&nbsp;&nbsp;{res}</p>  
    //       //   })}</div>
    //       //   QuestionsArray.splice(this.state.questionNumber+1,0,{
    //       //     text: response, 
    //       //     sender: 'BOT',
    //       //     key: 'OrderItems',
    //       //     buttons: [{
    //       //       text: 'Main Menu',
    //       //       value: 'continue',
    //       //     }]
    //       //   })
    //       //   this.setState({
    //       //     loadingBot: false,
    //       //     messages: [
    //       //       ...this.state.messages,
    //       //       {
    //       //         text: this.state.userInput,
    //       //         type: 'USER'
    //       //       }
    //       //     ],
    //       //     answers: this.state.questions[this.state.questionNumber].key ? {
    //       //       ...this.state.answers,
    //       //       [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
    //       //     } : {
    //       //       ...this.state.answers,
    //       //     },
    //       //     questions:QuestionsArray,
    //       //     showCategory:0,
    //       //     showNursingImages:0,
    //       //     showSuppliesImages:0,
    //       //     userInput: '',
    //       //     loadingBot: true,
    //       //   },()=>{
    //       //     this.setState({
    //       //       userInput:""
    //       //     },()=>{this.props.resetTranscript()
    //       //     this.nextQuestion()
    //       //     })
    //       //   })
    //       // }
        
    //       })
    //       .catch((err)=>{
    //         this.setState({
    //           Error:1
    //         })
    //       })
    //   }
      // else if(this.state.userInput.length>0&&this.state.userInput.length<15&&this.state.questions[this.state.questionNumber].key=="category"){
      //   console.log("category");
      //   this.setState({
      //     courseType:this.state.userInput,
      //     showCategory:0,
      //     showNursingImages:1,
      //     messages: [
      //       ...this.state.messages,
      //       {
      //         text: this.state.userInput,
      //         type: 'USER'
      //       }
      //     ],
      //     answers: this.state.questions[this.state.questionNumber].key ? {
      //       ...this.state.answers,
      //       [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
      //     } : {
      //       ...this.state.answers,
      //     },
      //     userInput: '',
      //     loadingBot: true,
      //   },()=>{
      //     this.setState({
      //       userInput:""
      //     },()=>{
      //     this.nextQuestion()
      //     })
      //   })
      // }
      // else if(this.state.userInput.length>0&&this.state.userInput.length<15&&this.state.questions[this.state.questionNumber].key=="categories"){
      //   if(this.state.userInput=="supplies"){
      //     console.log("supplies clicked")
      //     this.setState({
      //       SuppliesClicked:1
      //     })
      //   }
      //   else{
      //     console.log("medications clicked")
      //     this.setState({
      //       SuppliesClicked:0
      //     })
      //   }
      
      //   this.setState({
      //     courseType:this.state.userInput,
      //     showCategory:0,
      //     showNursingImages:0,
      //     messages: [
      //       ...this.state.messages,
      //       {
      //         text: this.state.userInput,
      //         type: 'USER'
      //       }
      //     ],
      //     answers: this.state.questions[this.state.questionNumber].key ? {
      //       ...this.state.answers,
      //       [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
      //     } : {
      //       ...this.state.answers,
      //     },
      //     userInput: '',
      //     loadingBot: true,
      //   },()=>{
      //     this.setState({
      //       userInput:""
      //     },()=>{
      //     this.nextQuestion()
      //     })
      //   })
      // }
      // else if((this.state.questions[this.state.questionNumber].key=="coursekind")&&(this.checkButtons(this.state.questions[this.state.questionNumber].buttons)==1)){
      //   console.log("course kind on submit")
      //   fetch("https://api.yummly.com/v1/api/recipes?_app_id=e2bd00e5&_app_key=d968774422e49446a02fb726482892a4&q="+this.state.userInput+"&maxResult=50")
      //   .then(response => response.json())
      //   .then(data =>{
      //     this.setState({ 
      //           showDrinkMenu:0,
      //           showFoodMenu:0,
      //           showStores:0,
      //           Data: data.matches,
      //           key:1
      //      })
      //         if(this.state.questionNumber==0 && this.state.Error==0){
      //           responsiveVoice.speak(this.state.questions[0].text)
      //           this.userInput.focus();
      //         }
      //     })
      //     .catch((err)=>{
      //       this.setState({
      //         Error:1
      //       })
      //       console.log(err,"Error")
      //   })
      // }



      // else if ((this.state.userInput.length > 0 || this.props.finalTranscript.length > 0)&&(this.state.questions[this.state.questionNumber].key!=="Quantity")&&(this.state.questions[this.state.questionNumber].key!="RoomNumber")) {
      //   console.log(this.state.questions[this.state.questionNumber].key)
      //   fetch("https://cors-anywhere.herokuapp.com/https://b1nlp.herokuapp.com/B1NLP/api/v1.0/command/"+this.state.userInput)
      //   .then(response => response.json())
      //   .then(data =>{
      //     console.log(data)
      //     console.log(typeof(data.Result.response))
      //     if(typeof(data.Result.response)=="string"){
      //       console.log('if')
      //       let Response="";
      //       let Destination="";
      //       let Type="";
      //       let quantity="";
      //       if(data.Result.intent=="Bring supplies"){
      //         if(data.Result.quantity!=undefined){
      //           quantity=data.Result.quantity+" ";
      //         }
      //         if(data.Result.type!=undefined){
      //           Response = "Ok, I will bring you "+quantity+data.Result.type+" "+data.Result.supplies[0];
      //           if(data.Result.destination!=undefined){
      //             Destination=" from the "+data.Result.destination+" in a few minutes."
      //           };
      //         }
      //         else{
      //           Response = "Ok, I will bring you "+quantity+data.Result.supplies[0];
      //           if(data.Result.destination!=undefined){
      //             Destination=" from the "+data.Result.destination+" in a few minutes."
      //           }
      //         }
      //       }
      //       else if(data.Result.intent=="Guide"){
      //         Response=data.Result.response+" to "+data.Result.destination+".";
      //       }
      //       else if(data.Result.intent=="Move to place"){
      //         Response= "Sure, I will go to "+data.Result.destination+" and wait for you.";
      //       }
      //       else{
      //         Response=data.Result.response
      //       }
      //       let QuestionsArray = this.state.questions;
      //       QuestionsArray.splice(this.state.questionNumber+1,0,{
      //         text: Response+Destination, 
      //         sender: 'BOT',
      //         key: 'OrderItems',
      //         buttons: [{
      //           text: 'Main Menu',
      //           value: 'continue',
      //         }]
      //       })
      //       console.log(data.Result.response,data.Result.intent)
      //       this.setState({
      //         loadingBot: false,
      //         messages: [
      //           ...this.state.messages,
      //           {
      //             text: this.state.userInput,
      //             type: 'USER'
      //           }
      //         ],
      //         answers: this.state.questions[this.state.questionNumber].key ? {
      //           ...this.state.answers,
      //           [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
      //         } : {
      //           ...this.state.answers,
      //         },
      //         questions:QuestionsArray,
      //         showCategory:0,
      //         showNursingImages:0,
      //         showSuppliesImages:0,
      //         userInput: '',
      //         loadingBot: true,
      //       },()=>{
      //         this.setState({
      //           userInput:""
      //         },()=>{this.props.resetTranscript()
      //         this.nextQuestion()
      //         })
      //       })
      //     }
      //     else{
      //       console.log('else');
      //       let QuestionsArray = this.state.questions;
      //       let response = <div>Discharge Instructions :<br/>
      //       {data.Result.response[0].instructions.map((res,i)=>{
      //          return <p key={i} style={{fontSize:13}}>&nbsp;&nbsp;&nbsp;&nbsp;{res}</p>  
      //       })}</div>
      //       QuestionsArray.splice(this.state.questionNumber+1,0,{
      //         text: response, 
      //         sender: 'BOT',
      //         key: 'OrderItems',
      //         buttons: [{
      //           text: 'Main Menu',
      //           value: 'continue',
      //         }]
      //       })
      //       this.setState({
      //         loadingBot: false,
      //         messages: [
      //           ...this.state.messages,
      //           {
      //             text: this.state.userInput,
      //             type: 'USER'
      //           }
      //         ],
      //         answers: this.state.questions[this.state.questionNumber].key ? {
      //           ...this.state.answers,
      //           [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
      //         } : {
      //           ...this.state.answers,
      //         },
      //         questions:QuestionsArray,
      //         showCategory:0,
      //         showNursingImages:0,
      //         showSuppliesImages:0,
      //         userInput: '',
      //         loadingBot: true,
      //       },()=>{
      //         this.setState({
      //           userInput:""
      //         },()=>{this.props.resetTranscript()
      //         this.nextQuestion()
      //         })
      //       })
      //     }
        
      //     })
      //     .catch((err)=>{
      //       this.setState({
      //         Error:1
      //       })
      //     })
      // }
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
          },()=>{this.props.resetTranscript()
          this.nextQuestion()
          })
        })
      }
  }
  componentDidUpdate(){
    if(document.getElementById("frame")){
      var objDiv = document.getElementById("frame");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    if(this.props.finalTranscript!==""){
      console.log("in update")
      this.setState({
        userInput: this.props.finalTranscript
      },()=>{this.props.resetTranscript()
      this.props.stopListening()})
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
          
          <Container style={{height:680,background: "#14191c"}}>
          <div style={{background:"#000",float:"left"}}></div>
              <div style={{height:'90%'}}>
              <MessageArea id="frame"
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
            <form className="inputForm" onSubmit={(e) => this.submitUserInput(e)}></form>
            <img className="audio-button" onClick={() => this.listen()} src={(this.props.listening) ? ("img/mic_on.png") : ("img/mic_off.png")}/>
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
            <SubmitButton onClick={(e) => this.submitUserInput(e)} className="submitButton"><img src="img/send.png"/></SubmitButton>            </div>
            </div>
                       
            </div>
              </div>
            
            
          </Container>
        </ThemeProvider>
      )
  }
}

Conversation1.propTypes = propTypes
const options = {
  autoStart: false
}

export default SpeechRecognition(options)(Conversation1);
