import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './components/layout/BaseLayout'
import reducer from './reducers'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

library.add(fab, fas)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer, {},  
  composeEnhancers(applyMiddleware(reduxThunk) ));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


