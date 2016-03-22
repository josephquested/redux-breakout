import clone from 'clone'

export default (state, action) => {
  switch (action.type) {

    case 'UPDATE MOOD':
      Ω(action.id)
      return state

    default:
      return state
  }
}
