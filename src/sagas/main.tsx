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
import { channel } from 'redux-saga'

//globals
import * as URL from '../globals/url'

import { GET_MAIN_DATA } from '../redux/actions/main'
import { setAppState, saveAppData } from '../redux/reducers/appState'

export function* getMainData() {
  yield put(setAppState('START_GET_MAIN_DATA', null, false))

  try {
    const response = yield call(axios, {
      method: 'GET',
      url: `${URL.main.MAIN}`
    })

    if (response.status === 200) {
      yield put(saveAppData('banners', response.data.banners))
      yield put(saveAppData('catalogs', response.data.catalogs))
      yield put(setAppState('SUCCESS_GET_MAIN_DATA', null, false))
    } else {
      yield put(setAppState('FAILED_GET_MAIN_DATA', response.data, false))
    }
  } catch (error: any) {
    yield put(setAppState('FAILED_GET_MAIN_DATA', null, false))
    console.error(error.message)
  }
}

const mainSagas = [takeLatest(GET_MAIN_DATA, getMainData)]

export default mainSagas
