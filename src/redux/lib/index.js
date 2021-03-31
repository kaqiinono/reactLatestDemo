import { connect as originConnect } from 'react-redux';
import { combineReducers } from 'redux';
import { actionsParser, Container, injectReducer, reducerConverter } from './utils';

export function connect(App, reducer) {
    if (reducer) {
        const actions = actionsParser(reducer);
        return originConnect(state => state, { ...actions })(App);
    }
    return App;
}

/**
 * @param App 入口组件
 * @param reducer 可以自定义reducer，也可以自动生成reducer(详见curReducer)
 * @param action
 * @param defaultState 默认值
 * @returns {function(*): *}
 * @constructor
 */
export function ContainerWrapper(App, reducerArr) {
    // eslint-disable-next-line react/prop-types
    return props => {
        if (reducerArr) {
            const { actions, reducers } = reducerConverter(Array.isArray(reducerArr) ? reducerArr : [reducerArr]);
            injectReducer(combineReducers(reducers));
            return Container(
                App,
                {
                    actions
                },
                props
            );
        }
        return <App {...props} />;
    };
}
