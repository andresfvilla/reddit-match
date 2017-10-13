import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App/App';
import Home from './Home/Home';
import NotFoundPage from './NotFoundPage/NotFoundPage';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Home} />
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
