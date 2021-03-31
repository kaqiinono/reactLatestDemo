import { takeLatest, all, call } from 'redux-saga/effects';
import Dialog from '../../component/Common/Dialog';

// const context = require.context('./', false, /\.js$/);
const context = require.context('../', false, /\.js$/);
const keys = context.keys();

const sagas = [];
for (let i = 0; i < keys.length; i += 1) {
    const model = context(keys[i]).default;
    const { effects, namespace } = model;
    if (namespace && effects) {
        Object.keys(effects).forEach(ek => {
            sagas.push(takeLatest(`${namespace}/${ek}`, safe(effects[ek])));
        });
    }
}

function safe(sagaFn) {
    return function* (action) {
        try {
            return yield call(sagaFn, action);
        } catch (e) {
            console.error(e);
            Dialog.error({
                title: '请求返回异常，请检查参数或联系管理员！',
                content: e
            });
            // window.location.href = '/datamill/common/noAuth.html';
            return null;
        }
    };
}

export default function* rootSaga() {
    yield all([...sagas]);
}
