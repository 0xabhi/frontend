import 'semantic-ui-css/semantic.min.css'
import '../styles/index.styl'
import './config'

window.log = console.log
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'mobx-react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore as syncHistory} from 'mobx-react-router'

import JobsList from './pages/JobsList'
import JobEdit from './pages/JobEdit'
import JobCreate from './pages/JobCreate'
import NewsletterSettings from './pages/NewsletterSettings'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'

import Header from './components/HeaderBar'
import Footer from './components/Footer'
import Crisp from './components/Crisp.Chat'

import stores from './stores'
const history = syncHistory(createBrowserHistory(), stores.routingStore)

ReactDOM.render((
  <Provider {...stores}>
    <Router key={Math.random()} history={history}>
      <div>
        <Header />
        <Route exact path='/' component={JobsList} />
        <Route path='/submit' component={JobCreate}/>
        <Route exact path='/jobs/:slug/edit/:securitySuffix' component={JobEdit} />
        <Route exact path='/jobs/:slug/edit' component={JobEdit} />

        <Route path='/@:username' component={UserProfile} />
        <Route path='/user/settings/newsletter/:email/:id' component={NewsletterSettings} />
        <Route path='/login' component={Login} />
        <Footer />
      </div>
    </Router>
  </Provider>
), document.getElementById('app'));
