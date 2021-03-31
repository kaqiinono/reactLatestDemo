import React from 'react';
import { connect as originConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from './store';
import globalModel from '../global';

function actionParser({ actionTypeEnum, namespace }) {
    const actions = {};
    for (const actionType of actionTypeEnum) {
        actions[actionType] = data => ({
            type: `${namespace}/${actionType}`,
            data
        });
    }

    // eslint-disable-next-line guard-for-in
    for (const actionType in globalModel.actionTypeEnum) {
        actions[actionType] = data => ({
            type: actionType,
            data
        });
    }
    return actions;
}

function modelActionParser(model) {
    const { namespace, ...rest } = model;
    return actionParser({
        namespace,
        actionTypeEnum: getActionTypeEnums(rest)
    });
}

export function actionsParser(models) {
    let actions = {};
    if (Array.isArray(models)) {
        models.forEach(model => {
            const curAction = modelActionParser(model);
            actions = { ...actions, ...curAction };
        });
    } else {
        actions = modelActionParser(models);
    }
    return actions;
}

export function Container(App, { actions }, props) {
    const mapStateToProps = state => state;
    const mapDispatchToProps = dispatch => ({
        ...bindActionCreators(actions, dispatch)
    });
    const AppNew = originConnect(mapStateToProps, mapDispatchToProps)(App);
    return <AppNew {...props} />;
}

/**
 * 根据store=>action的映射关系自动生成store信息
 * @param ActionEnum { [storeKey]:[对应action的Type] }
 * @param defaultState 默认值
 * @returns {function(*, *): (*)}
 */
export function reducerParser({ actionTypeEnum, initialState }) {
    return (state = { ...initialState, ...globalModel.initialState }, action) => {
        for (const actionType of actionTypeEnum) {
            if (action.type === actionType) {
                const newState = {
                    ...state,
                    ...action.data
                };
                if (newState.globalLoading && newState.globalLoading[actionType]) {
                    newState.globalLoading[actionType] = false;
                }
                return newState;
            }
        }
        return state;
    };
}

export function injectReducer(reducer) {
    try {
        if (reducer && store.reducers !== reducer) {
            store.replaceReducer(reducer);
        }
    } catch (e) {
        console.log(e);
    }
}

export function getActionTypeEnums({ effects, actionTypeEnum }) {
    let enums = [];
    if (effects) {
        enums = Object.keys(effects);
    }
    if (actionTypeEnum) {
        enums = enums.concat(Object.keys(actionTypeEnum));
    }
    return enums;
}

/**
 * 将数组进行合并
 * @param reducerArr
 * @returns {{reducers: {}, actions: {}}}
 */
export function reducerConverter(reducerArr) {
    const reducers = {};
    let actions = {};
    reducerArr.forEach(reducer => {
        const { namespace, initialState } = reducer;
        const actionsTypeEnums = [...getActionTypeEnums(reducer), ...Object.keys(globalModel.actionTypeEnum)];
        const curActions = actionParser({
            actionTypeEnum: [...actionsTypeEnums],
            namespace
        });
        actions = { ...actions, ...curActions };
        reducers[namespace] = reducerParser({
            actionTypeEnum: actionsTypeEnums,
            initialState
        });
    });
    return {
        actions,
        reducers
    };
}
