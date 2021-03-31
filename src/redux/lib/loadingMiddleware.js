import globalModel from '../global';

export const loadingMiddleWare = store => next => action => {
    const actionArr = action.type.split('/');
    const funcName = actionArr[1];
    if (/^get.*$/.test(funcName)) {
        const state = store.getState();
        const namespace = actionArr[0];
        const { globalLoading } = state[namespace];
        globalLoading[funcName] = true;
        store.dispatch({
            type: globalModel.actionTypeEnum.setGlobalLoading,
            data: globalLoading
        });
    }
    return next(action);
};
