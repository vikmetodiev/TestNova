import React, { Component } from 'react';
class LeftArrow extends Component {
  render() {
    return(
      <div className={this.props.class.length > 0 ? this.props.class : 'backArrow left'} onClick={this.props.goToPrevSlide}>
        <i className='fa fa-angle-left fa-2x' aria-hidden='true'></i>
      </div>
    )
  }
}
export default LeftArrow;