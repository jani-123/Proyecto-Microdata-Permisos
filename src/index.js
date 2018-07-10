import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MicroDataApp from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "redux-zero/react";
import store from './store/store';

const Index = () => (
  <Provider store={store}>
    <MicroDataApp />
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();

 