import React, { Component, Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Bot1 from "./Bot1";
import {Card, Col, Row } from 'reactstrap';
import Bot from './Bot';

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

class Delivery extends Component {   

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            shop:1,
            Incorrect:0,
            data:"",
            Unlock:0,
            Temp:0
        }            
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
                    <Col lg={12} md={12} sm={12} xs={12} style={{overflowX: "hidden", overflowY: "auto"}}>
            <Row>

                    <Col lg={12} md={12} sm={12} xs={12} >
            <Row>                                   
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                <Card className={classes.cardhover} style={{height:"95%",background: '#14191c'}}>
                    <div className="row" style={{height:80,background: "#000", width:"100%", margin: 0}}>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#1C1E21",height: 80,padding: 20,color: "#3edaeb"}}><h2>Bin 1</h2></Card>
                        </div>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#000",height: 80,padding: 20,color: "#3edaeb"}}><h2>Bin 2</h2></Card>
                        </div>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#000",height: 80,padding: 20,color: "#3edaeb"}}><h2>Bin 3</h2></Card>
                        </div>
                    </div>
                    <div className="row" style={{width:"100%", height: "100%", margin: 0}}>
                        {/* <img src={"/img/Bin2_"+this.state.shop+".png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/> */}
                        {
                            (this.state.Unlock==0)?((this.state.Temp==0&&this.state.Incorrect==0 ? <img src={(this.state.data.length<6)?("/img/Passcode"+this.state.data.length+".png"):("/img/Passcode5.png")} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/> : <img src={"/img/Incorrect.png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/>))
                            :((this.state.Temp==0)?(<img src={"/img/PasscodeUnlock.png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/>):(<img src={"/img/Bin2_"+this.state.shop+".png"} alt="bedestrian" responsive style={{width: "100%", height: "100%"}}/>))
                            
                        }
                         
                    </div>
                    </Card>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12" >
                <Card className={classes.cardhover} style={{height:"95%",background: '#14191c'}}>
                    <div className="row" style={{backgroundColor: "black", width:"100%", height: "100%", margin:0}}>
                        <Bot1 handleUserInput={(data,key)=>this.handleUserInput(data,key)} Unlock={this.Unlock} buttonSelect={this.onButtonSelect} />
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
export default withStyles(styles, { withTheme: true })(Delivery);