import { Component } from 'react';
import exception from '../../../assets/image/common/exception.svg';
import styles from './index.scss';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            // todo 需要一个全局的错误提示页面
            return (
                <div className={styles.main}>
                    <div>
                        <img src={exception} alt="exception" width="42" height="42" />
                        <p>对不起，发生异常，请刷新页面重试或联系管理员</p>
                    </div>
                </div>
            );
        }
        // eslint-disable-next-line react/prop-types
        return this.props.children;
    }
}

export default ErrorBoundary;
