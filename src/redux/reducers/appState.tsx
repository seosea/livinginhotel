import {
  SAVE_APP_DATA,
  SET_APP_STATE,
  INITIALIZE_APPLICATION
} from '../actions/appState'

const INIT_STATE = {
  state: 'INITIALIZE',
  params: undefined,
  data: {
    isLoading: false,
    session: false,
    main: {
      banners: [],
      catalogs: []
    }
  }
}

export const setAppState = (
  state: string,
  params: Object,
  isLoading: boolean
) => ({
  type: SET_APP_STATE,
  state,
  params,
  isLoading
})

export const saveAppData = (key: string, data: any) => ({
  type: SAVE_APP_DATA,
  key,
  data
})

export const initializeApp = () => ({
  type: INITIALIZE_APPLICATION
})

const reducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SET_APP_STATE:
      return Object.assign({}, state, {
        ...state,
        state: action.state,
        params: action.params,
        isLoading: action.isLoading
      })

    case SAVE_APP_DATA:
      return Object.assign({}, state, {
        ...state,
        data: {
          ...state.data,
          [action.key]: action.data
        }
      })
    default:
      return state
  }
}

export default reducer
