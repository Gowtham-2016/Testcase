import React, { Component, Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Bot1 from "./Bot1";
import {Card } from 'reactstrap';
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
            shop:1
        }            
    }   
    onButtonSelect = (val) => {
        console.log(val,"Val after fetch call")
        if(val==1){
            this.setState({shop: val});
        }
        else if(val==2){
            this.setState({shop: val});
        }
        else if(val==3){
            this.setState({shop:val});
        }
        
    }

    render() {      
        return (
            <div className="animated slideInUpTiny animation-duration-3" style={scroll}>
            <div>
                    <Header />
                </div>
            <div className="row" style={{backgroundColor: "black"}}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
            <div className="row">                                   
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                    <div className="row" style={{height:80,background: "#000"}}>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#000",height: 80,padding: 20,color: "#3edaeb"}}><h2>Bin 1</h2></Card>
                        </div>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#1C1E21",height: 80,padding: 20,color: "#3edaeb"}}><h2>Bin 2</h2></Card>
                        </div>
                        <div className="col-4 text-center p-0">
                            <Card style={{ margin: 0, background: "#000",height: 80,padding: 20,color: "#3edaeb"}}><h2>Bin 3</h2></Card>
                        </div>
                    </div>
                    <div className="row">
                        <img src={"/img/Bin2_"+this.state.shop+".png"} alt="bedestrian" responsive style={{width: "100%", height: "709px"}}/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12" >
                    <div className="row" style={{maxWidth:1200,backgroundColor: "black"}}>
                        <Bot1 buttonSelect={this.onButtonSelect} />
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        
        );
    }
}
export default withStyles(styles, { withTheme: true })(Delivery);