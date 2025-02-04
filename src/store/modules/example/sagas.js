import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

const requisicao = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      //reject();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(requisicao);
    toast.success('Deu certo');
    yield put(actions.clicaBotaoSuccess());
  } catch (e) {
    toast.error('Deu erro');
    yield put(actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
