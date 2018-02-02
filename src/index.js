import 'semantic-ui-css/semantic.min.css';
import '../styles/index.styl';
import './config';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom'
import { get as ENV } from 'react-global-configuration';

import PostAJob from './components/PostAJob';
import Footer from './components/Footer';
import Crisp from './components/Crisp.Chat';

if (ENV('crispChat')) {
  Crisp(ENV('crispChat'))
}

class App extends React.Component {
  render() {
    return [
      <PostAJob />,
      <Footer />
    ]
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/submit' component={PostAJob}/>
    </div>
  </Router>
), document.getElementById('app'));
