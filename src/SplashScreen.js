import React, { Component,Fragment } from 'react';
import { Container, Row, Col,Button, Card } from 'reactstrap';
import SpeechRecognition from 'react-speech-recognition';
import { withRouter } from "react-router";

import PropTypes from "prop-types";
const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
  }
 

let responsiveVoice = window.responsiveVoice;


const config = {
    scale: 1.03, // How large to scale the item: 1.00 -> 1.10~
    rotation: 0.3, // Rotation modifier: 0.1 (more) -> 0.5 (less)
    alpha: 0.4, // Alpha channel modifer: 1.01 -> 1.1~
    shadow: 8 // How much the shadow moves
  };
  
  class ParallaxHover extends React.Component {static propTypes() {
      return {
        children: React.Proptypes.node.isRequired,
        width: React.Proptypes.string.isRequired,
        height: React.Proptypes.string.isRequired
      };
    }
  
    constructor(props) {
      super(props);
      this.state = {
        rotateX: 0,
        rotateY: 0,
        shadowMovement: 20,
        shadowSize: 50,
        scale: 1,
        angle: 0,
        alpha: 0
      };
    }
  
    __buildState(rotateX, rotateY, shadowMovement, shadowSize, scale, angle, alpha) {
      this.setState({
        rotateX: rotateX,
        rotateY: rotateY,
        shadowMovement: shadowMovement,
        shadowSize: shadowSize,
        scale: scale,
        angle: angle,
        alpha: alpha
      });
    }
  
    __buildTransformStrings(rotateX, rotateY, scale) {
      return {
        WebkitTransform: `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        MozTransform: `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transform: `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      };
    }
  
    __calculateDistance(bounds, offsetX, offsetY) {
      const distanceX = Math.pow(offsetX - (bounds.width / 2), 2);
      const distanceY = Math.pow(offsetY - (bounds.height / 2), 2);
      return Math.floor(Math.sqrt(distanceX + distanceY));
    }
  
    __calculateAlphaFromCenter(current) {
      const max = Math.max(this.props.width, this.props.height);
      return current / max * config.alpha;
    }
  
    __handleMouseMove({ pageX, pageY, nativeEvent}) {
      const width = this.props.width;
      const height = this.props.height;
      const { scrollTop: scrollTop, scrollLeft: scrollLeft } = document.body;
  
      const bounds = this.refs.wrapper.getBoundingClientRect();
      const centerX = this.props.width / 2;
      const centerY = this.props.height / 2;
      const widthMultiplier = 320 / this.props.width;
  
      const offsetX = 0.52 - (pageX - bounds.left - scrollLeft) / width;
      const offsetY = 0.52 - (pageY - bounds.top - scrollTop) / height;
  
      const deltaX = (pageX - bounds.left - scrollLeft) - centerX;
      const deltaY = (pageY - bounds.top - scrollTop) - centerY;
      const rotateX = (deltaY - offsetY) * (0.08 * widthMultiplier);
      const rotateY = (offsetX - deltaX) * (0.04 * widthMultiplier);
      const angleRad = Math.atan2(deltaY, deltaX);
      const angleRaw = angleRad * 180 / Math.PI - 90;
      const angleDeg = angleRaw < 0 ? angleRaw + 360 : angleRaw;
      const distanceFromCenter = this.__calculateDistance(bounds, nativeEvent.offsetX, nativeEvent.offsetY);
      const shadowMovement = centerY * 0.25;
      const shadowSize = 120;
      const alpha = this.__calculateAlphaFromCenter(distanceFromCenter);
  
      this.__buildState(rotateX, rotateY, shadowMovement, shadowSize, config.scale, angleDeg, alpha);
    }
  
    __handleMouseLeave() {
      this.__buildState(0, 0, 20, 50, 1, 0, 0);
    }
  
    __renderChildren(children) {
      const st = this.state;
  
      if (!Array.isArray(children)) {
        const styles = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);
        console.log(this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale));
        return <div style={styles} className='ph-layer'>{children}</div>;
      }
  
      return children.map((layer, key) => {
        const num = key + 1;
        const rotateX = Math.floor(st.rotateX / num);
        const rotateY = Math.floor(st.rotateY / num);
        let styles = this.__buildTransformStrings(rotateX, rotateY, st.scale);
        let textClass;
  
        if (layer.ref === 'text') {
          textClass = 'ph-text';
          const shadow = {
            textShadow: `${rotateY * 0.5}px ${rotateX * 0.5}px 10px rgba(0, 0, 0, 0.5)`
          };
  
          styles = Object.assign({}, shadow, styles);
        }
  
        return <div style={styles} className={`ph-layer ${textClass}`} key={key}>{layer}</div>;
      });
    }
  
    render() {
      const st = this.state;
      const baseTransforms = this.__buildTransformStrings(st.rotateX, st.rotateY, st.scale);
  
      const stylesWrapper = Object.assign({}, baseTransforms, {
        width: this.props.width,
        height: this.props.height
      });
  
      const stylesShadow = Object.assign({}, baseTransforms, {
        boxShadow: `0px ${st.shadowMovement}px ${st.shadowSize}px rgba(0, 0, 0, 0.6)`
      });
  
      const stylesLighting = Object.assign({}, baseTransforms, {
        backgroundImage: `linear-gradient(${st.angle}deg, rgba(255,255,255, ${st.alpha}) 0%, rgba(255,255,255,0) 40%)`
      });
  
      return (
        <div style={{ transformStyle: 'preserve-3d'}}>
          <figure ref='wrapper' className='ph-wrapper' style={stylesWrapper} onMouseMove={this.__handleMouseMove.bind(this)} onMouseLeave={this.__handleMouseLeave.bind(this)}>
            <div className='ph-shadow' style={stylesShadow} />
            <div className='ph-layers'>
              {this.__renderChildren(this.props.children)}
            </div>
            <div className='ph-lighting' style={stylesLighting} />
          </figure>
        </div>
      );
    }
  }
  
  
  class SplashScreen extends React.Component {
  
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
    

    render() {
        return (
            <Row>
                <Col>
                    <center style={{
                         padding: "0",
                         textAlign: "center",
                    }}>
                    <ParallaxHover  width='800' height='500'>
                        <img ref='image' style={{height:450}} src='/img/newlogo.png' />
                        <h1 ref='text' style={{color:"#8be6f5"}}>B E D E S T R I A N</h1>
                    </ParallaxHover>
                    <Button onClick={(e)=>{
                        e.preventDefault(e);
                        this.props.history.push("/Home")
                    }} style={{
                            color: "#1f2528",
                            fontSize: "x-large",
                            fontWeight:700,
                            borderRadius:35,
                            marginTop:25,
                            padding: "15px 40px",
                            backgroundColor: "#6ed7e8",
                            borderColor:" #6c757d",
                    }}>GET STARTED</Button>
                    </center>
                </Col>
                {/* <Col>
                    <center style={{
                        padding: "50% 0",
                        textAlign: "center",
                    }}>
                    <Button style={{
                            color: "#1f2528",
                            fontSize: "x-large",
                            padding: "20px 50px 20px 50px",
                            backgroundColor: "#6ed7e8",
                            borderColor:" #6c757d",
                    }}>GET STARTED</Button>
                    </center>
                </Col> */}
            </Row>
        );
    }
}
SplashScreen.propTypes = propTypes
const options = {
  autoStart: false
}


export default withRouter(SpeechRecognition(options)(SplashScreen));
