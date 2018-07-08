import AuthStore from './AuthStore'
import JobStore from './JobStore'
import NewsletterStore from './NewsletterStore'
import StatsStore from './StatsStore'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'


let routingStore = new RouterStore()


export default {
  AuthStore,
  JobStore,
  NewsletterStore,
  StatsStore,
  routingStore
}
