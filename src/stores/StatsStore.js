import { get as ENV } from 'react-global-configuration'
import { observable, action } from 'mobx'
import { get, post, put, patch } from 'axios'
const API = ENV('apiDomain')

class StatsStore {
  @observable companies = null
  @observable jobApplications = null
  @observable jobs = null

  @action fetch = () => {
    this.loading = true
    get(`${API}/sitemap/stats`)
    .then(res => {
      Object.assign(this, res.data)
      this.loading = false
      this.error = false
    })
    .catch(err => {
      this.loading = false
      this.error = err
    })
  }

  @observable error = false
  @observable loading = false

}

export default new StatsStore()
