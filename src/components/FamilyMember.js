import React from 'react'
import MoodButton from './MoodButton.js'

export default React.createClass({
  render () {
    return (
      <div className='family-member'>
        <h2>{this.props.name}</h2>
        <p>Mood: {this.props.mood}</p>
        <MoodButton id={this.props.id} changeMood={this.props.changeMood}/>
      </div>
    )
  }
})
