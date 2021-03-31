import React, { Component } from 'react';
class RightArrow extends Component {
  render() {
    return(
      <div className={this.props.class.length > 0 ? this.props.class : 'backArrow right'} onClick={this.props.goToNextSlide}>
        <i className='fa fa-angle-right fa-2x' aria-hidden='true'></i>
      </div>
    )
  }
}
export default RightArrow;