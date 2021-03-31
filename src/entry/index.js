import ReactDOM from 'react-dom';
import './index.scss';
import Routes from '../router';

const route = Routes();

ReactDOM.render(route, document.getElementById('root'));
