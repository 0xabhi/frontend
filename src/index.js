import 'semantic-ui-css/semantic.min.css';
import '../styles/index.styl';
import './config';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'
import { get as ENV } from 'react-global-configuration';

import JobEdit from './pages/JobEdit';
import PostAJob from './components/PostAJob';
import Footer from './components/Footer';
import Crisp from './components/Crisp.Chat';

import JobStore from './stores/JobStore.js'

if (ENV('crispChat')) {
  Crisp(ENV('crispChat'))
}

ReactDOM.render((
    <Router history={browserHistory}>
      <div>
        <Route exact path='/' component={PostAJob} />
        <Route path='/submit' component={PostAJob}/>
        <Route path='/jobs/:slug/edit/:securitySuffix' component={JobEdit} />
        <Footer />
      </div>
    </Router>
), document.getElementById('app'));
