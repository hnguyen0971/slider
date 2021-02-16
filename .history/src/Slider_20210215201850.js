import React from "react";
import './Slider.css';

const IMG_WIDTH = 700;
const IMG_HEIGHT = 400;

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs : this.props.images,
      currentIndex: 0,
      movement: 0,
    };
  }
  lastTouch = 0;
  handleWheel = e => {
    clearTimeout(this.wheelTimeout);
    this.handleMovement(e.deltaX);
    this.wheelTimeout = setTimeout(() => this.handleMovementEnd(), 100);
  };
  handleTouchStart = e => {
    this.lastTouch = e.nativeEvent.touches[0].clientX;
  };
  
  handleTouchMove = e => {
    const delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
    this.lastTouch = e.nativeEvent.touches[0].clientX;

    this.handleMovement(delta);
  };

  handleTouchEnd = () => {
    this.handleMovementEnd();
    this.lastTouch = 0;
  };

  handleMovement = delta => {
    clearTimeout(this.transitionTimeout);
  
    this.setState(state => {
      const maxLength = state.imgs.length - 1;
  
      let nextMovement = state.movement + delta;
  
      if (nextMovement < 0) {
        nextMovement = 0;
      }
  
      if (nextMovement > maxLength * IMG_WIDTH) {
        nextMovement = maxLength * IMG_WIDTH;
      }
  
      return {
        movement: nextMovement,
        transitionDuration: "0s",
      };
    });
  };
  
  handleMovementEnd = () => {
    const { movement, currentIndex } = this.state;
  
    const endPosition = movement / IMG_WIDTH;
    const endPartial = endPosition % 1;
    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - currentIndex;
  
    let nextIndex = endingIndex;

    if (deltaInteger >= 0) {
      if (endPartial >= 0.1) {
        nextIndex += 1;
      }
    } else if (deltaInteger < 0) {
      nextIndex = currentIndex - Math.abs(deltaInteger);
      if (endPartial > 0.9) {
        nextIndex += 1;
      }
    }

    this.transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));

  };

  transitionTo = (index, duration) => {
    this.setState({
      currentIndex: index,
      movement: index * IMG_WIDTH,
      transitionDuration: `${duration}s`,
    });
  
    this.transitionTimeout = setTimeout(() => {
      this.setState({ transitionDuration: "0s" });
    }, duration * 100);
  };
  
  componentWillUnmount = () => {
    clearTimeout(this.transitionTimeout);
  };
  
  render() {
    const { currentIndex, movement, transitionDuration, imgs } = this.state;
    const maxLength = imgs.length - 1;
    const maxMovement = maxLength * IMG_WIDTH;
    return (
      <div className="App">
        <div
          className="main"
          style={{
            width: `${IMG_WIDTH}px`,
            height: `${IMG_HEIGHT}px`,
          }}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onWheel={this.handleWheel}
        >
          <div
            className="swiper"
            style={{
              transform: `translateX(${movement * -1}px)`,
              transitionDuration: transitionDuration,
            }}
          >
            {imgs.map(src => {
              return( 
                <img src={src.url} alt="" width="100%" height="100%" />
                );
            })}
          </div>
          {movement !== 0 && (
            <button
              className="back move"
              onClick={() => {
                this.transitionTo(currentIndex - 1, 0.5);
              }}
            >
              ←
            </button>
          )} {
          <h1 className="middle">
             {imgs[currentIndex].caption}
          </h1>
          }
          {movement !== maxMovement && (
            <button
              className="next move"
              onClick={() => {
                this.transitionTo(currentIndex + 1, 0.5);
              }}
            >
              →
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default Slider;
