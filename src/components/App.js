import React from 'react'
import Header from './Header.js'
import FamilyMember from './FamilyMember.js'

export default React.createClass({

  changeMood: function (familyMemberId) {
    this.props.store.dispatch({type: 'UPDATE MOOD', state: this.props.moodStates, id: familyMemberId})
  },

  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'/>
        <FamilyMember id={0} name='Mom' changeMood={this.changeMood} />
        <FamilyMember id={1} name='Dad' changeMood={this.changeMood}/>
        <FamilyMember id={2} name='Daughter' changeMood={this.changeMood}/>
        <FamilyMember id={3} name='Son' changeMood={this.changeMood}/>
      </div>
    )
  }
})
