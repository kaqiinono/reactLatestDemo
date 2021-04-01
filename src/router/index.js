import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './constant';
import store from '../redux/lib/store';
// import ErrorBoundary from '../component/Common/ErrorBoundary';

const defaultUrl = '/activity/list';

function getRoutes(rs) {
    return rs.map(route => <RouteWithSubRoutes key={route.path} {...route} />);
}

function RouteWithSubRoutes(route) {
    const parent = <Route key={route.path} path={route.path} render={props => <route.component {...props} />} />;
    if (route.routes && route.routes.length > 0) {
        const child = getRoutes(route.routes);
        child.push(parent);
        return <Switch key={route.path}>{child}</Switch>;
    }
    return parent;
}

export default function RouteConfig() {
    return (
        <Provider store={store}>
            <Router>
                {/* <ErrorBoundary> */}
                    <Switch>
                        {getRoutes(routes)}
                        <Route render={() => <Redirect to={defaultUrl} />} />
                    </Switch>
                {/* </ErrorBoundary> */}
            </Router>
        </Provider>
    );
}
