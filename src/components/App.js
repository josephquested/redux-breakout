import React from 'react'
import Header from './Header.js'
import FamilyMember from './FamilyMember.js'

export default React.createClass({
  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'/>
        <FamilyMember name='Mom'/>
        <FamilyMember name='Dad'/>
        <FamilyMember name='Daughter'/>
        <FamilyMember name='Son'/>
      </div>
    )
  }
})
