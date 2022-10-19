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

export function* initializeApplication() {}

const appStateSagas = [
  takeLatest(INITIALIZE_APPLICATION, initializeApplication)
]

export default appStateSagas
