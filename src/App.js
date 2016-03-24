'use strict';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, FormattedMessage} from 'react-intl';
import TodoList from './components/TodoList';
import ReactPathMenu from './components/ReactPathMenu';
import GalleryCarousel from './components/GalleryCarousel';
import  Slider from 'react-slick';

import CSSModules from 'react-css-modules';
import styles from './App.css';

@CSSModules(styles)
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    };

    const GalleryCarouselSettings = {
      imgWidth: 248,
      imgMargin: 10,
      numImage: 6,
      numImageDisplay: 4,
    };

    return (
      <div>
        <div>
          <h2> Multiple items </h2>
          <Slider {...settings}>
            <div><img className="item-img" src='http://vrstore-cms-images.s3.amazonaws.com/85cb4371-fc4c-45d1-8a71-04f5a94139b7/gallery-3_20'/></div>
            <div><img className="item-img" src='http://vrstore-cms-images.s3.amazonaws.com/85cb4371-fc4c-45d1-8a71-04f5a94139b7/gallery-3_20'/></div>
            <div><img className="item-img" src='http://vrstore-cms-images.s3.amazonaws.com/85cb4371-fc4c-45d1-8a71-04f5a94139b7/gallery-3_20'/></div>
            <div><img className="item-img" src='http://vrstore-cms-images.s3.amazonaws.com/85cb4371-fc4c-45d1-8a71-04f5a94139b7/gallery-3_20'/></div>
            <div><img className="item-img" src='http://vrstore-cms-images.s3.amazonaws.com/85cb4371-fc4c-45d1-8a71-04f5a94139b7/gallery-3_20'/></div>
            <div><img className="item-img" src='http://vrstore-cms-images.s3.amazonaws.com/85cb4371-fc4c-45d1-8a71-04f5a94139b7/gallery-3_20'/></div>
          </Slider>
        </div>

        <hr />

        <GalleryCarousel {...GalleryCarouselSettings}/>
        
        <hr />
        <ReactPathMenu />
        <TodoList />
        <p>
          Hello1111111 <b>Davis!!</b>, you have {' '}
          <FormattedMessage
          id="test1"
          defaultMessage="test1"
          />
          {' '}
          <FormattedMessage
          id="test2"
          defaultMessage="test2"
          />
        </p>
      </div>
    );
  }
}

var { messages } = { messages: { test1: '測試1', test2: '測試2' } }
ReactDOM.render(
  <IntlProvider messages={messages}>
    <App />
  </IntlProvider>,
  document.getElementById('container')
);
