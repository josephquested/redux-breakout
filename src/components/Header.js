import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='main-header'>
        <h1>{this.props.header}</h1>
      </div>
    )
  }
})
