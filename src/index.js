import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from './Slider';
import reportWebVitals from './reportWebVitals';

const images = [
  {
    url: 'http://placeimg.com/700/400/nature',
    caption: 'beautiful!'
  },
  {
    url: 'http://placeimg.com/701/400/nature',
    caption: 'awesome!'
  },
  {
    url: 'http://placeimg.com/702/400/nature',
    caption: 'cool!'
  },
  {
    url: 'http://placeimg.com/703/400/nature',
    caption: 'crazy!'
  }
];

ReactDOM.render(
  <React.StrictMode>
    <Slider images={images} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
