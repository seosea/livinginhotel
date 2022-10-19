import { all } from 'redux-saga/effects'

import appStateSagas from './appState'
import mainSagas from './main'

export default function* rootSaga() {
  yield all([...appStateSagas, ...mainSagas])
}
