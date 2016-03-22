import React from 'react'
import MoodButton from './MoodButton.js'

export default React.createClass({
  getInitialState: function () {
    return {
      mood: 'Neutral'
    }
  },

  changeMood: function () {
    const moods = [
      'Dead',
      'Dying',
      'Awful',
      'Bad',
      'Neutral',
      'Good',
      'Great',
      'Amazing',
      'Perfect'
    ]
    Ω(moods)
  },

  render () {
    return (
      <div className='family-member'>
        <h2>{this.props.name}</h2>
        <p>Mood: {this.state.mood}
        </p>
        <MoodButton changeMood={this.changeMood}/>
      </div>
    )
  }
})
