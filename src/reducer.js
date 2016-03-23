import clone from 'clone'

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

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default (state = [], action) => {
  switch (action.type) {

    case 'UPDATE MOOD':
      let newState = clone(state)
      newState[action.id] = moods[randomNumber(0, moods.length - 1)]
      return newState

    default:
      return state
  }
}
