import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppMUI from './AppMUI';
import TabForm from './TabForm.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppMUI />, document.getElementById('root'));
registerServiceWorker();
