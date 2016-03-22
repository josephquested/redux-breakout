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

const initialState = ['Neutral', 'Neutral', 'Neutral', 'Neutral']

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'UPDATE MOOD':
      let newState = clone(state)
      newState[action.id] = moods[randomNumber(0, 8)]
      Ω(`family member ${action.id} is now...`, newState[action.id], '')
      return newState

    default:
      return state
  }
}
