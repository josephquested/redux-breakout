import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='mood-button'>
        <button onClick={() => this.props.changeMood(this.props.id)}>Change Mood</button>
      </div>
    )
  }
})
