import {
  all,
  call,
  put,
  spawn,
  takeLatest,
  fork,
  takeEvery,
  cps
} from 'redux-saga/effects'

import axios from 'axios'

import { INITIALIZE_APPLICATION } from '../redux/actions/appState'

import { setAppState, saveAppData } from '../redux/reducers/appState'
import { getMainData } from './main'

export function* initializeApplication() {
  yield put(setAppState('START_GET_MAIN_DATA', null, false))
  try {
    yield call(getMainData)
  } catch (error) {
    yield put(setAppState('FAILED_GET_MAIN_DATA', null, false))
  }

  yield put(setAppState('SUCCESS_GET_MAIN_DATA', null, false))
}

const appStateSagas = [
  takeLatest(INITIALIZE_APPLICATION, initializeApplication)
]

export default appStateSagas
