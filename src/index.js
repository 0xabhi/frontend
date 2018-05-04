import 'semantic-ui-css/semantic.min.css'
import '../styles/index.styl'
import './config'

import React from 'react'
import ReactDOM from 'react-dom'

import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router, Route } from 'react-router'

import JobEdit from './pages/JobEdit'
import PostAJob from './components/PostAJob'
import Footer from './components/Footer'
import Crisp from './components/Crisp.Chat'

import jobStore from './stores/JobStore.js'
const stores = { jobStore, routingStore: new RouterStore() }
const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, stores.routingStore);

ReactDOM.render((
  <Provider {...stores}>
    <Router history={history}>
      <div>
        <Route exact path='/' component={PostAJob} />
        <Route path='/submit' component={PostAJob}/>
        <Route path='/jobs/:slug/edit/:securitySuffix' component={JobEdit} />
        <Route path='/jobs/:slug/edit' component={JobEdit} />
        <Footer />
      </div>
    </Router>
  </Provider>
), document.getElementById('app'));
