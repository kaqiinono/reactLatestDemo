import React from 'react';
import { Button } from '@jd/jmtd';
import Modal from '@jd/jmtd/es/Modal';
import PropTypes from 'prop-types';
import Icon from '@jd/jmtd/es/Icon';
import styles from './index.scss';

export const IconEnum = {
    info: 'jmt-info-circle-f',
    warn: 'jmt-exclamation-circle-f',
    success: 'jmt-check-circle-f',
    error: 'jmt-exclamation-circle-f',
    warning: 'jmt-exclamation-circle-f'
};
/**
 * 信息弹出框模板，只做展示
 * @param title
 * @param content
 * @param type
 * @param children 按钮
 * @param visible
 * @returns {JSX.Element}
 * @constructor
 */
const Dialog = ({ title, content, type = 'info', onOk, onCancel, visible, close }) => {
    const onClick = fn => {
        fn && fn();
        close && close();
    };
    return (
        <Modal top={300} open={visible}>
            <div className={styles.container}>
                <div className={styles.notice}>
                    <span className={styles.iconBox}>
                        {type && <Icon className={`${IconEnum[type]} ${styles.icon} ${styles[type]}`} />}
                    </span>
                    {title && <div className={styles.title}>{title}</div>}
                    {content && <div className={styles.content}>{content}</div>}
                </div>
                <div className={styles.buttons}>
                    {onCancel && <Button onClick={() => onClick(onCancel)}>取消</Button>}
                    <Button semantic="primary" onClick={() => onClick(onOk)}>
                        确定
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

Dialog.propTypes = {
    type: PropTypes.string,
    content: PropTypes.any,
    title: PropTypes.any,
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    close: PropTypes.func.isRequired
};

Dialog.defaultProps = {
    type: 'info',
    title: null,
    content: null,
    onOk: null,
    onCancel: null
};

export default Dialog;
