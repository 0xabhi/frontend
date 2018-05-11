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

import JobEdit from './pages/JobEdit'
import JobCreate from './pages/JobCreate'
import PostAJob from './components/PostAJob'
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
        <Route exact path='/' component={PostAJob} />
        <Route path='/submit' component={PostAJob}/>
        <Route path='/submit2' component={JobCreate}/>
        <Route path='/jobs/:slug/edit' component={JobEdit} />
        <Route path='/jobs/:slug/edit/:securitySuffix' component={JobEdit} />

        <Route path='/@:username' component={UserProfile} />
        <Route path='/user/settings/newsletter/:email/:id' component={NewsletterSettings} />
        <Route path='/login' component={Login} />
        <Footer />
      </div>
    </Router>
  </Provider>
), document.getElementById('app'));
