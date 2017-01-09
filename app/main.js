import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/App';
import Lobby from './components/Lobby';
import About from './components/About';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render((
  <Provider store={store}> 
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Lobby} />
        <Route path='about' component={About} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
