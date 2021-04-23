import App from '../component/App';
import Grid from '../component/Grid';
import Drag from '../component/Drag';

const routes = [
    {
        path: '/',
        component: App,
        exact: true
    },
    {
        path: '/grid',
        component: Grid,
        exact: true
    },
    {
        path: '/drag',
        component: Drag,
        exact: true
    }
];
export default routes;
