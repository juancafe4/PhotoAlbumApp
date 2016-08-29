import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import ShowAllAlbums from './components/ShowAllAlbums';
import DisplayAlbum from './components/DisplayAlbum';
import DisplayPhoto from './components/DisplayPhoto';

import {IndexRoute, Router, Route, browserHistory } from 'react-router'
const css = require('./css/style.css');

render(
  (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ShowAllAlbums}/>
      <Route path='/album/:id' component={DisplayAlbum}>
        <Route path='/photo/:id' component={DisplayPhoto}></Route>
      </Route>

    </Route>
  </Router>
),
  document.getElementById('root')
);
