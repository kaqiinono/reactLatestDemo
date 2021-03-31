import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';

const Drawer = props => {
    // eslint-disable-next-line react/prop-types
    const { visible, width, style, children, placement } = props;
    const fixStyle = {
        width,
        ...style
    };
    if (!visible) {
        fixStyle.transform = 'translateX(100%)';
        document.body.style.setProperty('overflow', 'auto', 'important');
    } else {
        document.body.style.setProperty('overflow', 'hidden', 'important');
    }

    return (
        <div tabIndex="-1" className={`${styles.drawer} ${styles[`drawer-${placement}`]} ${visible ? `${styles['drawer-open']}` : ''}`}>
            <div className={styles['drawer-mask']} />
            <div className={styles['drawer-content-wrapper']} style={{ ...fixStyle }}>
                <div className={styles['drawer-content']}>{children}</div>
            </div>
        </div>
    );
};
Drawer.defaultProps = {
    width: undefined,
    style: undefined,
    placement: 'right',
    visible: false
};
Drawer.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    placement: PropTypes.string
};

export default Drawer;
