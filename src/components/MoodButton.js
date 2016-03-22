import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='mood-button'>
        <button onClick={() => this.props.changeMood()}>Change Mood</button>
      </div>
    )
  }
})
