import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store';
import App from './screens/app/App';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import { selectMenuItem, MenuSelect } from './ducks/menu';

const user: string = sessionStorage.getItem('email');
if (user) {
  store.dispatch({ type: '[@auth] login locally successful', payload: user });
}

const menuFromLocalStorage: string = sessionStorage.getItem('previousSelectedMenu');
const menu: MenuSelect = menuFromLocalStorage as MenuSelect;
if (menu) {
  store.dispatch(selectMenuItem(menu));
}

const mountPoint = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountPoint
);

registerServiceWorker();
