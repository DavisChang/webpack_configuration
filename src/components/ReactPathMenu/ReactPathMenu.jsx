// reference to https://github.com/nashvail/ReactPathMenu

'use strict';
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { range } from 'lodash';
import styles from './ReactPathMenu.css';
import CSSModules from 'react-css-modules';

const DEG_TO_RAD = Math.PI / 180;

const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 50;

const NUM_CHILDREN = 5;

const M_X = 900;
const M_Y = 150;

const FLY_OUT_RADIUS = 120;
const SEPARATION_ANGLE = 40;
const FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE;
const BASE_ANGLE = ((180 - FAN_ANGLE)/2);

const SPRING_CONFIG_CHILDBUTTON = [200, 15];
const SPRING_CONFIG_CROSS = [500, 30];

function toRadians(degrees) {
  return degrees * DEG_TO_RAD;
}

function findDeltaPositions (index) {
  let angle = BASE_ANGLE + (index * SEPARATION_ANGLE);
  return {
    deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM / 2),
    deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM / 2),
  };
}

@CSSModules(styles)
class ReactPathMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      childButtons: [],
    };

    //You need to bind the function early, prevent a new function is created with a new identity
    this.openManue = this.openManue.bind(this);
  }

  componentDidMount() {
    let childButtons = [];
    range(NUM_CHILDREN).forEach(index => {
      childButtons.push(this.renderChildButton(index));
    });
    this.setState({
      childButtons,
    });

  }

  mainButtonStyles() {
    return {
      width: MAIN_BUTTON_DIAM,
      height: MAIN_BUTTON_DIAM,
      top: M_Y - (MAIN_BUTTON_DIAM / 2),
      left: M_X - (MAIN_BUTTON_DIAM / 2),

    };

  }

  initialChildButtonStyles() {
    return {
      width: CHILD_BUTTON_DIAM,
      height: CHILD_BUTTON_DIAM,
      top: spring(M_Y - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG_CHILDBUTTON),
      left: spring(M_X - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG_CHILDBUTTON),
      rotate: spring(-180, SPRING_CONFIG_CHILDBUTTON),
      scale: spring(0.5, SPRING_CONFIG_CHILDBUTTON),
    };
  }

  finalChildButtonStyles(childIndex){
    let { deltaX, deltaY } = findDeltaPositions(childIndex);
    return {
      width: CHILD_BUTTON_DIAM,
      height: CHILD_BUTTON_DIAM,
      top: spring(M_Y - deltaY, SPRING_CONFIG_CHILDBUTTON),
      left: spring(M_X + deltaX, SPRING_CONFIG_CHILDBUTTON),
      rotate: spring(0, SPRING_CONFIG_CHILDBUTTON),
      scale: spring(1, SPRING_CONFIG_CHILDBUTTON),
    };

  }

  openManue(){
    let { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen, 
    });

    range(NUM_CHILDREN).forEach((index) => {
      let { childButtons } = this.state;
      setTimeout(() => {
        childButtons[NUM_CHILDREN - index - 1]  = this.renderChildButton(NUM_CHILDREN - index - 1);
        this.setState({ childButtons });
      }, index * 100);
    });

  }

  renderChildButton(index) {
    let {isOpen} = this.state;
    let style = isOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles() ;
    return (
      <Motion style={style} key={index}>
        {
          ({width, height, top, left, rotate, scale}) => 
          <div  
            className="child-button"
            style={{
              width: width,
              height: height,
              top: top,
              left: left,
              transform: `rotate(${rotate}deg) scale(${scale})`,
            }}>
            <i className={`childicon-${index}`}/>
          </div>
        }
      </Motion>
    );
  }


  render() {
    let { isOpen, childButtons } = this.state;
    let mainButtonRotation = isOpen ? { rotate: spring(0, SPRING_CONFIG_CROSS), } : { rotate: spring(-135, SPRING_CONFIG_CROSS), };
    return(
      <div>
        {
          childButtons.map( (button, index) => {
            return childButtons[index];
          })
        }

        <Motion style={mainButtonRotation}>
          {
            ({rotate}) => 
              <div
                className='main-button'
                style={{...this.mainButtonStyles(), transform: `rotate(${rotate}deg)`}}
                onClick={this.openManue} >
                <a className='cross'/>
              </div>
          }
        </Motion>

      </div>
    );
  }

}

export default ReactPathMenu;
