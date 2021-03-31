import React, { PureComponent } from 'react';
import { Tooltip } from '@jd/jmtd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.scss';

class TextLimitWithToolTip extends PureComponent {
    constructor(props) {
        super(props);
        this.pRef = null;
        this.state = {
            showTip: false
        };
    }

    onHover = () => {
        const { scrollWidth, clientWidth } = this.pRef;
        if (scrollWidth > clientWidth) {
            this.setState({
                showTip: true
            });
        }
    };

    onLeave = () => {
        this.setState({
            showTip: false
        });
    };

    renderChildren = () => {
        const { children } = this.props;
        const divNode = typeof children === 'string' ? <div>{children}</div> : children;
        return React.cloneElement(divNode, {
            onMouseOverCapture: this.onHover,
            onMouseOutCapture: this.onLeave,
            ref: r => {
                this.pRef = r;
            },
            className: classNames(styles.ellipse, children.props && children.props.className)
        });
    };

    render() {
        const { placement, title, ...rest } = this.props;
        const { showTip } = this.state;
        return (
            <Tooltip
                theme="light"
                trigger="control"
                open={showTip}
                mouseEnterDelay={100}
                placement={placement}
                title={
                    <div
                        onMouseOverCapture={this.onHover}
                        onMouseOutCapture={this.onLeave}
                        style={{
                            maxWidth: this.pRef && this.pRef.clientWidth + 30,
                            maxHeight: '300px',
                            overflow: 'auto'
                        }}>
                        {title}
                    </div>
                }
                {...rest}>
                {this.renderChildren()}
            </Tooltip>
        );
    }
}

TextLimitWithToolTip.defaultProps = {
    placement: 'top'
};
TextLimitWithToolTip.propTypes = {
    placement: PropTypes.string,
    title: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired
    // style: PropTypes.object
};

export default TextLimitWithToolTip;
