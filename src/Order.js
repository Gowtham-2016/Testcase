import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Card, Button} from 'reactstrap';
import CoverFlow from 'coverflow-react';
import Header from './Header';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import green from "@material-ui/core/colors/green"; 
import purple from "@material-ui/core/colors/purple";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles, MuiThemeProvider,
    createMuiTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import NewCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button1 from '@material-ui/core/Button';

import classNames from "classnames";
import ScrollArea from "react-scrollbar";
import { Link } from 'react-router-dom';
import Bot from './Bot';
import './App.css';

const imagesArr = [
    'img/slider1.png',
    'img/slider2.jpg',
    'img/slider3.jpg',
    'img/slider4.jpg',
    'img/slider1.png',
    'img/slider2.jpg',
    'img/slider3.jpg',
    'img/slider4.jpg',
];


const bgimg = {
    width: "100%",
    height:"100%",
    position: "absolute",
    padding: "3px",
    marginLeft: "20px"
    
}
const menuimg = {
    width: "110px",
    height: "80px",
    position: "absolute",
    border:'2px solid #fff'
}
// const cardhover:hover = {
//     hover : {
//         cursor: "pointer",
//         backgroundColor: "black",
//         boxShadow: "rgba(0, 0, 0, 0.45) 0px 0px 20px 0px"
//     }
// }



const theme = createMuiTheme({
    palette: {
      primary: green
    },
    typography: {
      useNextVariants: true
    }
  });
const styless = theme => ({
    card: {
        maxWidth: 345,
    
      },
      media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    margin: {
      margin: theme.spacing.unit
    },
    cssRoot: {
      color: "#fff",
      backgroundColor: purple[500],
      "&:hover": {
        backgroundColor: purple[700]
      }
    },
    bootstrapRoot: {
      boxShadow: "none",
      textTransform: "none",
      fontSize: 16,
      padding: "6px 12px",
      border: "1px solid",
      backgroundColor: "#000",
      borderColor: "#007bff",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:hover": {
        backgroundColor: "#0069d9",
        borderColor: "#0062cc"
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#0062cc",
        borderColor: "#005cbf"
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
      }
    }
  });
//SHAKE SHACK DATA
const ShakeShack = [{
    Category:"Burgers",
    Items:[{
        imgURL:"/img/shake-stack.jpg",
        name:"ShackBurger®",
        Description:"Single or Double Cheeseburger topped with lettuce, tomato, ShackSauce™."
    },{
        imgURL:"/img/shake2.jpg",
        name:"Hamburger",
        Description:"Single or Double Choice of lettuce, tomato, pickle or onion. Add cheese or all-natural applewood smoked bacon."
    },{
        imgURL:"/img/shake3.jpg",
        name:"Shack Stack®",
        Description:"Cheeseburger and a ’Shroom Burger topped with lettuce, tomato, ShackSauce™."
    }]
},{
    Category:"Chicken",
    Items:[{
        imgURL:"/img/shackChick.png",
        name:"Chick'n Shack",
        Description:"Crispy chicken breast with lettuce, pickles and buttermilk herb mayo."
    }]
},{
    Category:"Fries",
    Items:[{
        imgURL:"/img/shakeFries.jpg",
        name:"Cheese Fries",
        Description:"Topped with our special blend of cheddar and American cheese sauce. Warning: They’re highly addictive."
    }]
}];
//Roasting Plant data
const RoastingPlant = [{
    Category:"Coffee",
    Items:[{
        imgURL:"/img/Roast1.jpg",
        name:"ABC Blend",
        Description:"Our ABC blend is going to be your favorite back to school fuel."
    },{
        imgURL:"/img/Roast2.jpg",
        name:"God Cheer Blend",
        Description:"The ultimate holiday coffee to jumpstart you right into the holiday season!"
    },{
        imgURL:"/img/Roast3.jpg",
        name:"Roasting Plant Blend",
        Description:"We put our own name on this deep, satisfying blend because it represents the core qualities of Roasting Plant coffee: Fresh beans, a precision roast, heady aroma, and crave-worthy flavor."
    },{
        imgURL:"/img/Roast4.jpg",
        name:"Roasting Plant Espresso Blend",
        Description:"A striking union between the Brazil Serra Negra and Roasting Plant’s flagship blend."
    }]
},{
    Category:"Holiday Gift Boxes",
    Items:[{
        imgURL:"/img/Roast11.jpg",
        name:"Premium Box",
        Description:"Filled with Roasting Plant Classic, our Premium box is a perfect gift for friends, family or co-workers!"
    },{
        imgURL:"/img/Roast12.jpg",
        name:"Select Box",
        Description:"Crispy chicken breast with lettuce, pickles and buttermilk herb mayo.An assortment of handpicked beans from all over the world, this Select Box will upgrade the coffee tasting experience."
    },{
        imgURL:"/img/Roast13.jpg",
        name:"Reserve Box",
        Description:"Give the gift of the most ambitious coffee tasting experience this year.  This collection represents the peak of the worlds most rare artisan coffees."
    }]
},{
    Category:"Merchandise",
    Items:[{
        imgURL:"/img/Roast21.jpg",
        name:"Roasting Plant T-Shirt",
        Description:"Our current Roasting Plant Coffee t-shirts are here to help you show off your favorite just roasted coffee."
    },{
        imgURL:"/img/Roast22.jpg",
        name:"Roasting Plant Coffee Mug",
        Description:"Get ready to sip in style with our heavy-weight 16oz mug. "
    },{
        imgURL:"/img/Roast23.jpg",
        name:"Roasting Plant Adjustable Hat",
        Description:"Adjustable hat embroidered with the Roasting Plant Coffee logo. One size fits all. Available in off-white or dark blue."
    }]
}];

let Yummly1 = [{
    Category:"Menu",
    Items:[{
        Description: "heavy cream, pumpkin purée, sugar, salt",
        imgURL: "https://lh3.googleusercontent.com/E1_16qjQOwhdEgYdyynZIXPFouY5sGLCWYnLKl8GbL3do0cBhoe7K0z79MWSOdgqrLwqRnkXlp1Nx8rZ3NXBfQ=s180-c",
        name: "Pumpkin Bread Pudding"
    },{
        Description: "spaghetti, lean ground beef, taco seasoning, water",
        imgURL: "https://lh3.googleusercontent.com/2Y0HIH8Z2F1z7V4H_BhGmLg5jD_COuWAIseNpAvRSOg-iMk9iYb7dgViiERNJlTiK-Jw5GRYvI3Wys6-iChjZw=s180-c",
        name: "Taco Spaghetti"
    },{
        Description: "spaghetti, fresh mushrooms, olive oil, balsamic vinegar",
        imgURL: "https://lh3.googleusercontent.com/UzdbnDH5IRshn_s2ZwcJBEVG4dvMRFsL42qBIFloVZvI_9IIVWzlpnAoPJI6Goqh0HtSnA0WhZYdx6CUNFFqYw=s180-c",
        name: "Roasted Green Beans & Mushrooms"
    }]
}];

//Plum market Data
const PlumMarket = [{
    Category:"Holiday Dinner Packages",
    Items:[{
        imgURL:"/img/Plum1.jpg",
        name:"Holiday Dinner Package",
        Description:"Includes : All Natural Roasted Boneless Turkey Breast with Gravy, Housemade Cranberry Sauce, Choice of 3 additional Holiday Side Dishes"
    },{
        imgURL:"/img/Plum2.jpg",
        name:"Mini Holiday Package",
        Description:"Includes: All Natural Roasted Turkey Breast with Gravy, Choice of Italian Sausage & Chestnut or Traditional Vegetarian Herbed Bread Stuffing, Crème Fraîche Mashed Potatoes, Green Beans Almondine, Housemade Cranberry Sauce"
    },{
        imgURL:"/img/Plum3.jpg",
        name:"Spiral Ham Dinner Package",
        Description:"Includes: Sliced Ham, Selection of 3 Holiday Side Dishes"
    }]
},{
    Category:"BakeHouse",
    Items:[{
        imgURL:"/img/Plum11.jpg",
        name:"Patisserie Parmentier Yule Logs",
        Description:"Flavors : Vanilla and Chocolate."
    },{
        imgURL:"/img/Plum12.jpg",
        name:"Ethel's 3 Pack Gluten Free Dandies",
        Description:"Flavors : Turtle Dandies, Raspberry Dandies, Pecan Dandies, Brownies and Blondies."
    },{
        imgURL:"/img/Plum13.jpg",
        name:"Zingerman's Bakehouse Coffeecakes",
        Description:"Sour Cream | Lemon Poppyseed | Hot Cocoa | Tea Cake | Gingerbread"
    }]
},{
    Category:"Platters And Boards",
    Items:[{
        imgURL:"/img/Plum21.jpg",
        name:"Mediterranean Dip Display",
        Description:"Tabouli, Hummus, Tzatziki, Vegetarian Grape Leaves, Caprese Skewers, with Olives and Mini Pita Bread"
    },{
        imgURL:"/img/Plum22.jpg",
        name:"All Natural Grilled Chicken Platter",
        Description:"Marinated and grilled to perfection, served with Mini Pretzel Rolls and our Housemade Tzatziki and Basil Aioli"
    },{
        imgURL:"/img/Plum23.jpg",
        name:"International Artisan Cheese Board",
        Description:"The best cheeses from abroad! Includes Cotswold, 6 month aged Manchego, Brie, Chevre, and Cheddar, served with Dried Fruits, Nuts, Crackers, and sliced Baguette."
    }]
}];


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

const Menu = (props) => {
    const { expanded, classes } = props;
   
    return (
        <Card style={{background: '#14191c',height:"100%"}} className={classes.cardhover}>

        <ScrollArea
            speed={0.2}
            className="area"
            contentClassName="content"
            horizontal={false}>
        { () =>   <div>
            {/* <div><h1 style={{paddingTop: 15,textAlign: "center",color: "#6ed7e8"}}>Menu List</h1></div> */}
            {
                props.data.map((item, i) => {
                    let Itemss = item.Items;
                    return (
                        <ExpansionPanel expanded={expanded === (i + 1)} onChange={props.handleChange(i + 1)} style={{margin: 10}}>
                            <ExpansionPanelSummary style={{background: '#1f2528'}}expandIcon={<ExpandMoreIcon style={{color:"#6ad7e8"}} />}>
                                <Typography style={{color:"#6ad7e8"}} className={classes.heading}>{item.Category}</Typography>
                                <Typography className={classes.secondaryHeading}></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{background:'#14191c',padding: "0 !important"}}>
                                <div className="row" style={{width:'100%',margin:"auto"}}>
                                    {   
                                        
                                        Itemss.map((row, j) => {
                                            return (
                                                <div className="row col-12" onClick={() => props.onItemClick(row)} style={{ padding: 10,margin:0, cursor: "pointer",minHeight:100, borderBottom: "1px solid #ccc" }}>
                                                    <div className="col-4">
                                                        <img src={row.imgURL} alt="category" img-responsive style={menuimg} />
                                                    </div>
                                                    <div className="col-8">
                                                        <Typography style={{color:'#fff'}}>
                                                        <div><h4 style={{textAlign: "center",color: "#6ed7e8"}}>{row.name}</h4></div>
                                                        <Truncate lines={2} ellipsis={<p style={{color:"aqua"}}>.. <a onClick={()=>{
                                                            props.that.setState({check:1})}}>Read more</a></p>}>
                                                            {row.Description}
                                                        </Truncate>
                                                        </Typography>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </ExpansionPanelDetails>

                        </ExpansionPanel>
                    )
                })
            }


        </div>
    }
    </ScrollArea>
    </Card>

       );
}

class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            completed: 0,
            activeIndex: 0,
            shop: 1,
            counter: 0,
            data:ShakeShack,
            like:0,
            OrderedFood:"",
            expanded: 1,
            item: {},
            check: false
        }
    }
    onOrder(e){
        e.preventDefault();
        this.setState({
            OrderedFood:this.state.item.name
        })

    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };  
    uncheck(){
        this.setState({
            check: 0
        });
    }
    onButtonSelect = (val) => {
        console.log(val,"Val after fetch call")
        if(val==1){
            this.setState({shop: val,data:ShakeShack});
        }
        else if(val==2){
            this.setState({shop: val,data:RoastingPlant});
        }
        else if(val==3){
            this.setState({shop:val,data:PlumMarket});
        }
        else if(val==4){
            this.setState({shop:val,data:Yummly1});
        }
        else if(val==5){
            this.setState({shop: val,data:ShakeShack});
        }
        else if(val==6){
            this.setState({shop: val,data:RoastingPlant});
        }
        else if(val==7){
            this.setState({shop:val,data:PlumMarket});
        }
        else if(val==8){
            this.setState({shop:val,data:Yummly1});
        }
        else{
            this.setState({shop:val});
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        console.log("order mounted")
        if(this.props.location.state!=undefined){
            console.log(this.props.location.state.val)
            if(this.props.location.state.val==1){
                if(this.props.location.state.Food!=""){
                    console.log(this.props.location.state.Food)
                        fetch("https://api.yummly.com/v1/api/recipes?_app_id=e2bd00e5&_app_key=d968774422e49446a02fb726482892a4&q="+this.props.location.state.Food+"&&maxResult=5")
                        .then(response => response.json())
                        .then(data =>{  
                        this.getyummly(data.matches,this.props.location.state.Food)
                        this.setState({
                            shop:1
                        })
                        })
                        .catch((err)=>{
                            this.setState({
                            Error:1
                            })
                            console.log(err,"Error")
                        })
                }
                else{
                    this.setState({
                        shop:1,
                        data:ShakeShack
                    })
                }
            }
            else if(this.props.location.state.val==2){
                if(this.props.location.state.Food!=""){
                    console.log(this.props.location.state.Food)
                        fetch("https://api.yummly.com/v1/api/recipes?_app_id=e2bd00e5&_app_key=d968774422e49446a02fb726482892a4&q="+this.props.location.state.Food+"&&maxResult=5")
                        .then(response => response.json())
                        .then(data =>{  
                        this.getyummly(data.matches,this.props.location.state.Food)
                        this.setState({
                            shop:2
                        })
                        })
                        .catch((err)=>{
                            this.setState({
                            Error:1
                            })
                            console.log(err,"Error")
                        })
                }
                else{
                    this.setState({
                        shop:2,
                        data:RoastingPlant
                    })
                }
               
            }
            else if(this.props.location.state.val==3){
                if(this.props.location.state.Food!=""){
                    console.log(this.props.location.state.Food)
                        fetch("https://api.yummly.com/v1/api/recipes?_app_id=e2bd00e5&_app_key=d968774422e49446a02fb726482892a4&q="+this.props.location.state.Food+"&&maxResult=5")
                        .then(response => response.json())
                        .then(data =>{  
                        this.getyummly(data.matches,this.props.location.state.Food)
                        this.setState({
                            shop:3
                        })
                        })
                        .catch((err)=>{
                            this.setState({
                            Error:1
                            })
                            console.log(err,"Error")
                        })
                }
                else{
                    this.setState({
                        shop:3,
                        data:PlumMarket
                    })
                }
               
               
            }
            else{
                console.log(this.props.location.state.Food)
                fetch("https://api.yummly.com/v1/api/recipes?_app_id=e2bd00e5&_app_key=d968774422e49446a02fb726482892a4&q="+this.props.location.state.Food+"&&maxResult=5")
                .then(response => response.json())
                .then(data =>{  
                  this.getyummly(data.matches,this.props.location.state.Food)
                  this.setState({
                    shop:4
                  })
                  })
                  .catch((err)=>{
                    this.setState({
                      Error:1
                    })
                    console.log(err,"Error")
                })
            }
            
        }
        //progressbar
        this.timer = setInterval(this.progress, 500);
    }

    increment() {
        this.setState({
          counter: this.state.counter + 1
        });
    }
      
    decrement(){
    if(this.state.counter>0){
        this.setState({
        counter: this.state.counter - 1
    });
    }
    }
    onLike(e){
        e.preventDefault();
        this.setState({
            like:!this.state.like
        })
    }

    
    getyummly = (data,name) => {
        console.log("data from child", data)
        let Yummly = [{
            Category:"Menu",
            Items:[{
                imgURL:data[0].imageUrlsBySize["90"],
                name:data[0].recipeName,
                Description:data[0].ingredients[0]+", "+data[0].ingredients[1]+", "+data[0].ingredients[2]+", "+data[0].ingredients[3]
            },{
                imgURL:data[1].imageUrlsBySize["90"],
                name:data[1].recipeName,
                Description:data[1].ingredients[0]+", "+data[1].ingredients[1]+", "+data[1].ingredients[2]+", "+data[1].ingredients[3]
            },{
                imgURL:data[2].imageUrlsBySize["90"],
                name:data[2].recipeName,
                Description:data[1].ingredients[0]+", "+data[2].ingredients[1]+", "+data[2].ingredients[2]+", "+data[2].ingredients[3]
            },{
                imgURL:data[3].imageUrlsBySize["90"],
                name:data[3].recipeName,
                Description:data[1].ingredients[0]+", "+data[3].ingredients[1]+", "+data[3].ingredients[2]+", "+data[3].ingredients[3]
            }]
        }];
        console.log(Yummly)
        this.setState({
            data:Yummly,
            shop:4
        })
    }
    render(){
        const { classes } = this.props;
        const { completed } = this.state;
        return(
            <Fragment  style={{height:"100vh"}}>
            <Header />
           
            <Row>

            <Col lg={12} md={12} sm={12} xs={12} style={{height:"65vh"}}>
                <Row style={{height:"100%"}}>
                {this.state.check ?
                <Fragment>
                <Col lg={4} md={4} sm={12} xs={12}>
                <Card style={{background: '#14191c',height:"98%"}}  className={classes.cardhover}>
                {/* <Card style={{background: '#14191c',height:"98%"}}  className={classes.cardhover}>
                <div className="row" style={{background: '#14191c',height:'100%',margin:0}}>
                               
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12" >
                               <div><h2 style={{textAlign: "center",color: "#fff"}}>Item Details</h2></div>
                                   <img src={this.state.item.imgURL} alt="category" img-responsive style={{width: "150px", margin: "24px 0px 10px 135px", display: "block"}}/>
                                   <div style={{color:"#fff",padding:"0px 90px"}}>
                                   <br/>
                                      {this.state.item.Description}
                                   </div>
                                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 ml-2">
                                                       <div className="row">
                                                       
                                                           <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 mt-2">
                                                               <Button  className="primary text-white borderbutton">

                                                                   Add
                                       </Button>
                                                           </div>
                                                           <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
                                                               <Button onClick={()=>this.uncheck()} className="primary text-white borderbutton mt-2">
                                                                   Cancel
                                           </Button>
                                                           </div>
                                                           <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
                                                               <Button onClick={()=>this.uncheck()} className="primary text-white borderbutton mt-2">Back
                                       </Button>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                                   
                               </div>
                               <div className="col-12" style={{}}>
                               
                                 
                                   
                               </div>
                           </div>
                           </Card> */}
                             <NewCard style={{height:"100%",background:"#14191c"}} className={classes.card}>
                             <div onClick={()=>this.uncheck()} style={{color:"#3edaeb",paddingTop:5,height:30,float:"right"}}>Back <img style={{height:18,paddingRight:5,paddingBottom:3}} src={"/img/BackArrow.png"}/></div>
                                <CardActionArea style={{maxHeight:320,overflowY:"scroll"}}>
                                    <center><img
                                    style={{height:250,maxWidth:"100%"}}
                                    src={(this.state.item.imgURL)}
                                    /></center>
                                    <CardContent>
                                    <Typography style={{color:"#46c5e8"}} gutterBottom variant="h5" component="h2">
                                       {this.state.item.name}
                                    </Typography>
                                    <Typography style={{color:"white"}} component="p">
                                        {this.state.item.Description}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Row style={{margin:"0 auto"}}><CardActions style={{position:"absolute",
                                        bottom:0,
                                        width:"100%",
                                    
                                        }}>
                                         <Col style={{margin:"0 !important"}} lg={4} md={4} sm={12} xs={12}> 
                                        <IconButton onClick={(e)=>this.onLike(e)} aria-label="Add to favorites">
                                            <FavoriteIcon style={{color:(!this.state.like)?('rgb(125, 128, 130)'):("#ec6161")}}/>
                                        </IconButton>
                                        </Col>
                                        <Col  style={{margin:"0 !important"}} lg={4} md={4} sm={12} xs={12}> 
                                       
                                            <Row style={{float:"right",marginRight:"30%"}}>
                                        <img src={"/img/minus.png"}  style={{height:20}} onClick = {(e)=>this.decrement(e)}/> 
                                           
                                           <div id='counter' style={{color:"white",padding:"0px 5px 0px 5px"}}>{this.state.counter}</div> 
                                               
                                           <img src={"/img/plus.png"} style={{height:20}} onClick = {(e)=>this.increment(e)}/>
                                           </Row>
                                        
                                     
                                        </Col>
                                          
                                    {/* <Button1 style={{color:"#46c5e8"}} size="small" >
                                    Share
                                    </Button1> */}
                                     <Col  style={{margin:"0 !important"}} lg={4} md={4} sm={12} xs={12}>
                                        <Button1 onClick={(e)=>this.onOrder(e)} style={{color:"black",background:"#3edaeb",fontWeight:700,float:"right",marginRight:5}} size="small" >
                                            Order
                                        </Button1>
                                    </Col>
                                      
                                </CardActions>       
                                </Row>
                                
                                </NewCard>
                                </Card>
                </Col>
                
                <Col lg={4} md={4} sm={12} xs={12} >
                    <div className="row" style={{height:"100%",maxHeight:"64vh"}}>
                        <Menu onItemClick={(data) => {
                            this.setState({
                                item: data,
                                check:1
                            })
                        }} that={this} data={this.state.data} handleChange={this.handleChange} expanded={this.state.expanded} classes={classes} />
                    </div>
                </Col>
                </Fragment>
                :
                <Fragment>
                <Col lg={4} md={4} sm={12} xs={12}>
                <Card style={{background: '#14191c',height:"98%"}} className={classes.cardhover}>
                    <div className="row">
                        <img src={"/img/default" + this.state.shop + ".png"} alt="map" responsive style={bgimg} />
                    </div>
                </Card>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <div className="row" style={{height:"100%",maxHeight:"64vh"}}>
                        <Menu onItemClick={(data) => {
                            this.setState({
                                item: data,
                                check:1
                            })
                        }} that={this} data={this.state.data} handleChange={this.handleChange} expanded={this.state.expanded} classes={classes} />
                    </div>
                </Col>
                </Fragment>
                
            }
                    <Col lg={4} md={4} sm={12} xs={12} >
                        <Card style={{background: '#14191c',height:"98%"}} className={classes.cardhover}>
                            <Bot ref="Bot" OrderedFood={this.state.OrderedFood} getyummly={this.getyummly} buttonSelect={this.onButtonSelect} />
                        </Card>
                    </Col>
                </Row>
                </Col>
                <Row style={{height:"20vh"}}>
                    <Col lg={12} md={12} sm={12} xs={12} >
                        <CoverFlow imagesArr={imagesArr} 
                            handleSelect={(index)=>{this.onButtonSelect(index+1)}}
                            direction="horizontal"
                            width="100%"
                            height={200}
                            itemRatio="8:5"
                            background="rgba(0, 0, 0, 0)"
                        />
                    </Col>
                </Row>
               
             </Row>   
            </Fragment>

        );
    }
}
export default withStyles(styles,styless, { withTheme: true })(Order);