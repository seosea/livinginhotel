import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'
import { appState, main } from './reducers'

const reducers = {
  appState: appState,
  main: main
}

const reducer = combineReducers({
  ...reducers
})

let sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
