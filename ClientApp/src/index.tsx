import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store';
import App from './screens/app/App';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

const user = sessionStorage.getItem('email');
if (user) {
  store.dispatch({ type: '[@auth] login locally successful', payload: user });
}

const mountPoint = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountPoint
);

registerServiceWorker();
