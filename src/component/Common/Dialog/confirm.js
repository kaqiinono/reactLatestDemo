import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from './Dialog';

const ConfirmDialog = props => <Modal {...props} />;

export default function confirm(config) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    let currentConfig = { ...config, close, visible: true };

    function close(...args) {
        currentConfig = {
            ...currentConfig,
            visible: false,
            afterClose: destroy.bind(this, ...args)
        };
        render(currentConfig);
    }

    function update(newConfig) {
        currentConfig = {
            ...currentConfig,
            ...newConfig
        };
        render(currentConfig);
    }

    function destroy(...args) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        const triggerCancel = args && args.length && args.some(param => param && param.triggerCancel);
        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
        }
    }

    function render(props) {
        ReactDOM.render(<ConfirmDialog {...props} />, div);
    }

    render(currentConfig);

    return {
        destroy: close,
        update
    };
}
