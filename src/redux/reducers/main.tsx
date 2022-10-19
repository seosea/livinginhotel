import { GET_MAIN_DATA } from '../actions/main'

export const getMainData = () => ({
  type: GET_MAIN_DATA
})

const reducer = (state = {}, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
