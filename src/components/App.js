import React from 'react'
import Header from './Header.js'
import FamilyMember from './FamilyMember.js'

export default React.createClass({

  changeMood: function (familyMemberId) {
    this.props.store.dispatch({type: 'UPDATE MOOD', state: this.props.moodStates, id: familyMemberId})
  },

  generateFamily: function () {
    const familyMembers = ['Mom', 'Dad', 'Daughter', 'Son', 'Mistress']
    return familyMembers.map((name, index) => {
      return <FamilyMember
      id={index}
      name={name}
      key={index}
      changeMood={this.changeMood}
      mood={this.props.moodStates[index]}/>
    })
  },

  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'/>
        {this.generateFamily()}
      </div>
    )
  }
})
