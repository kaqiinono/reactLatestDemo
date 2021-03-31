/**
 * Created by Yuicon on 2017/6/27.
 *
 * @format
 */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { loadingMiddleWare } from './loadingMiddleware';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    state => ({
        ...state,
        globalLoading: {}
    }),
    applyMiddleware(loadingMiddleWare, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
