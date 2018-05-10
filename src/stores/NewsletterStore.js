import { get as ENV } from 'react-global-configuration'
import { observable, action } from 'mobx'
import { get, post, put, patch } from 'axios'
const API = ENV('apiDomain')

class NewsletterStore {
  @observable error = false
  @observable loading = false
  @observable _changes = []
  @observable newsletter = {
    categories: [],
    employmentTypes: []
  }
  initialSettings = {}

  @action fetchForEditing = ({email, securitySuffix}) => {
    this.loading = true
    get(`${API}/subscriber/findOne`, {
      withCredentials: true,
      params: {securitySuffix, email}
    })
    .then(res => {
      this.newsletter = res.data
      this.initialSettings = res.data
      this._changes = []
      this.loading = false
      this.error = false
    })
    .catch(err => {
      this.loading = false
      this.error = err
    })
  }

  @action handleChange = (e, { name, value, checked }) => {
    this.newsletter[name] = value || checked || null

    let _changes = this._changes || []
    _changes.push(name)
    this._changes = [...new Set(_changes)]
  }

  @action save = () => {
    this.loading = true
    put(`${API}/subscriber/update`, this.newsletter, { withCredentials: true })
    .then(res => {
      this.newsletter = res.data
      this._changes = []
      this.loading = false
      this.error = false
    })
    .catch(err => {
      this.loading = false
      this.error = err
    })
  }

}

export default new NewsletterStore()
