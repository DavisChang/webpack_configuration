'use strict';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './GalleryCarousel.css';

@CSSModules(styles)
class GalleryCarousel extends Component {
  constructor(props) {
    super(props);
    const {imgWidth, imgMargin, numImage, numImageDisplay} = this.props;
    const deltaX = imgWidth + imgMargin;
    const totalLength = deltaX * numImage ;
    const maxLength = totalLength - deltaX * numImageDisplay;

    this.state = {
      containerWidth: 0,
      xInitialPostion: 0,
      x: 0,
      imgWidth,
      imgMargin,
      numImage,
      numImageDisplay,
      deltaX,
      totalLength,
      maxLength: - maxLength,
    };

    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.onWindowResized = this.onWindowResized.bind(this);
  }

  checkBreakPoint() {
    const windowInnerWidth = window.innerWidth;
    if(1024 < windowInnerWidth) {
      this.setState({
        numImageDisplay: 4,
      });
    }else if (1024 > windowInnerWidth && windowInnerWidth > 600) {
      this.setState({
        numImageDisplay: 3,
      });
    }else {
      this.setState({
        numImageDisplay: 3,
      });
    }
  }

  initialState() {
    this.checkBreakPoint();
    const containerWidth = document.getElementById("gallery-container").clientWidth;
    const imgWidth = (containerWidth - (this.state.numImageDisplay * this.state.imgMargin)) / this.state.numImageDisplay;
    const deltaX = imgWidth + this.state.imgMargin;
    const totalLength = deltaX * this.state.numImage ;
    const maxLength = totalLength - deltaX * this.state.numImageDisplay;

    return {
      containerWidth,
      x: 0,
      imgWidth,
      deltaX,
      totalLength,
      maxLength: - maxLength,
    };
  }

  componentWillMount() {
    this.checkBreakPoint();
  }

  componentDidMount() {
    this.setState(this.initialState());

    if (window.addEventListener) {
      window.addEventListener('resize', this.onWindowResized);
    } else {
      window.attachEvent('onresize', this.onWindowResized);
    }

  }

  onWindowResized() {
    this.setState(this.initialState());
  }

  initialStyle(){
    return {
      fontSize: 12,
    };
  }

  initialWrapperStyle(){
    return {
      width: this.state.containerWidth,
    };
  }

  nextImage(){
    if(this.state.x <= this.state.maxLength) {
      this.setState({
        x: this.state.xInitialPostion,
      });
      return;
    }

    this.setState({
      x: this.state.x - this.state.deltaX,
    });
  }

  prevImage(){
    if(this.state.x >= this.state.xInitialPostion) {
      return;
    }

    this.setState({
      x: this.state.x + this.state.deltaX,
    });
  }

  imgSizeTrack() {
    const halfMargin = this.state.imgMargin / 2;
    return {
      width: this.state.imgWidth,
      marginRight: halfMargin,
      marginLeft: halfMargin,
    };
  }

  render(){
    const translateX = this.state.x;
    const data = 
      [
        <img src='http://vrstore-cms-images.s3.amazonaws.com/85cb4371-fc4c-45d1-8a71-04f5a94139b7/gallery-3_20'/>,
        <img src='http://vrstore-cms-images.s3.amazonaws.com/41cb7e89-f99e-43ad-9f99-073e66e6320a/gallery-4_20'/>,
        <img src='http://vrstore-cms-images.s3.amazonaws.com/41cb7e89-f99e-43ad-9f99-073e66e6320a/gallery-3_20'/>,
        <img src='http://vrstore-cms-images.s3.amazonaws.com/41cb7e89-f99e-43ad-9f99-073e66e6320a/gallery-1_100'/>,
        <img src='http://vrstore-cms-images.s3.amazonaws.com/40de7036-88f0-4245-b936-f94f601b38d0/gallery-3_20'/>,
        <img src='http://vrstore-cms-images.s3.amazonaws.com/40de7036-88f0-4245-b936-f94f601b38d0/gallery-1_100'/>,
      ];

    console.log(this.state);
    return (
      <div className="gallery-container" id="gallery-container">
        <div className="gallery-initialized"  style={this.initialStyle()}>
          <div className="gallery-wrapper-outer">
            <div 
              className="gallery-wrapper" 
              style={{transition: `all 500ms ease`, transform: `translateX(${translateX}px)`}}> 

              {
                data.map( (item, index) => {
                  return(
                    <div style={this.imgSizeTrack()} key={index}>
                      { item }
                    </div>
                  );
                })
              }

            </div>
          </div>
          <div className="gallery-controls">
            <div className="gallery-nav-left" onClick={this.prevImage}></div>
            <div className="gallery-nav-right" onClick={this.nextImage}></div>
            <span className="ripple"></span>
          </div>
        </div>
      </div>
    );
  }
}

GalleryCarousel.propTypes = {
  imgWidth: React.PropTypes.number.isRequired,
  imgMargin: React.PropTypes.number.isRequired,
  numImage: React.PropTypes.number.isRequired,
  numImageDisplay: React.PropTypes.number.isRequired,
};

export default GalleryCarousel;
