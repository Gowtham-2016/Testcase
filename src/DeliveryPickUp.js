import React, { Component, Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Bot2 from "./Bot2";
import {Card, Col, Row } from 'reactstrap';
import { Line, Circle } from 'rc-progress';
import "./DeliveryPickUp.css"

//styles
const scroll = {
    overflowX: "hidden",
    overflowY: "auto"
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    cardhover: {
        
        cursor: "pointer",
        // backgroundColor: "black",
        boxShadow: "4px 4px 5px 1px black"

},
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class DeliveryPickUp extends Component {   

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            shop:1,
            Incorrect:0,
            data:"",
            Time:20,
            progress:0,
            Unlock:0,
            Arrived:0,
            Temp:0
        }         
        this.increment=this.increment.bind(this);   
    }
    increment(){
        let that = this;
        if(this.state.progress<100){
            this.setState({
                progress:this.state.progress+5,
                Time:this.state.Time-1
            })
            setTimeout(function(){
                that.increment()
            },1000)
        }
        else{
            setTimeout(function(){
               that.setState({
                   Arrived:1
               })
            },3000)
        }
    }
    componentDidMount(){
        this.increment()
    }
    onButtonSelect = (val) => {
        console.log(val,"Val after fetch call")
        if(val==1){
            this.setState({shop: val,Temp:1});
        }
        else if(val==2){
            this.setState({shop: val,Temp:1});
        }
        else if(val==3){
            this.setState({shop:val,Temp:1});
        }
    }
    Unlock = (data,key) => {
        console.log(data,key);
        if(data==99999){
            this.setState({
                Unlock:1
            })
        }
        else{
            if(key=="temp"){
                this.setState({
                    Temp:1
                })
            }
            else{
                this.setState({
                    Incorrect:1
                })
            }
           
        }
    }
    handleUserInput(data,key){
        console.log(data,key);
        this.setState({
            data
        })
        console.log(this.state)
       
    }
    render() {    
        const { expanded, classes } = this.props;  
        return (
            <Fragment  >
                    <Header />
                    <Col lg={12} md={12} sm={12} xs={12} style={{height:"100%",overflowX: "hidden", overflowY: "auto"}}>
            <Row>

                    <Col lg={12} md={12} sm={12} xs={12} >
            <Row>                                   
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12" style={{height:"100%"}}>
                <Card className={classes.cardhover} style={{height:"85vh",background: '#14191c'}}>
                    <div className="row" style={{height:50,background: "#000", width:"100%", margin: 0}}>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#1C1E21",height: 50,padding: 10,color: "#3edaeb"}}><h3>Bin 1</h3></Card>
                        </div>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#000",height: 50,padding: 10,color: "#3edaeb"}}><h3>Bin 2</h3></Card>
                        </div>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#000",height: 50,padding: 10,color: "#3edaeb"}}><h3>Bin 3</h3></Card>
                        </div>
                    </div>
                    <div className="row" style={{width:"100%", height: "100%", margin: 0}}>
                        {
                            (this.state.Arrived)?(
                                <Fragment>
                                {/* <img src={"/img/Bin2_"+this.state.shop+".png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/>  */}
                                {
                                   (this.state.Unlock==0)?((this.state.Temp==0&&this.state.Incorrect==0 ? <img src={(this.state.data.length<6)?("/img/Passcode"+this.state.data.length+".png"):("/img/Passcode5.png")} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/> : <img src={"/img/Incorrect.png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/>))
                                   :((this.state.Temp==0)?(<img src={"/img/PasscodeUnlock.png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/>):(<img src={"/img/Bin2_"+this.state.shop+".png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/>))
                                   
                               } 
                               </Fragment>
                            ):(
                                (this.state.progress==100)?(
                                    <div className="Tick" style={{margin:"0 auto"}}>
    
                                    <div className="col-12" style={{margin:"auto",height:100}}>
                                       
                                    </div>
            
                                    <div className="col-12" style={{margin:"0 auto"}}>
                                    <div style={{margin:"0 auto"}}>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                                <circle className="path circle" fill="none" stroke="#3edaeb" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                                <polyline className="path check" fill="none" stroke="#3edaeb" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                                            </svg>
                                            <br/>
                                            <center style={{color:"#3edaeb"}}><h2>Your Order has Arrived</h2></center>
                                        </div>
                                    </div>
    
    
                                    
                                    </div>
                                ):(
                                    <Fragment>
                                    <div className="col-12" style={{margin:"auto"}}>
                                    <center> <h4 style={{color:"#3edaeb"}}>Estimated time of arrival at your door is {this.state.Time} Minutes.</h4>
                                        <h4 style={{color:"#3edaeb"}}>You will receive your order in :</h4></center>
                                    </div>
            
                                    <div className="col-12" style={{margin:"0 auto"}}>
                                        <div style={{width:225,margin:"0 auto"}}>
                                        <center style={{color:"#3edaeb"}}><h2>{this.state.Time} Minutes</h2></center>
                                        <br/>
                                            <Circle percent={this.state.progress} strokeWidth="4" strokeColor="#3edaeb" />
                                        </div>
                                    </div>
                                </Fragment>
    
                                )
                            )
                          
                        }
                      
                       
                   
                       
                       
                         
                    </div>
                    </Card>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12" >
                <Card className={classes.cardhover} style={{height:"85vh",background: '#14191c'}}>
                    <div className="row" style={{backgroundColor: "black", width:"100%", height: "100%", margin:0}}>
                        <Bot2 Arrived={this.state.Arrived} handleUserInput={(data,key)=>this.handleUserInput(data,key)} Unlock={this.Unlock} buttonSelect={this.onButtonSelect} />
                    </div>
                    </Card>
                </div>
            </Row>
            </Col>
            </Row>
        </Col>
        </Fragment>
        
        );
    }
}
export default withStyles(styles, { withTheme: true })(DeliveryPickUp);