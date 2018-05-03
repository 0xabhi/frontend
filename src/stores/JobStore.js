import { get as ENV } from 'react-global-configuration'
import { observable, action } from 'mobx'
import { get, post, put, patch } from 'axios'
const API = ENV('apiDomain')


class JobStore {
  @observable jobs = []
  @observable job = {
    jobTitle: 'nice'
  }

  @action fetchForEditing = ({slug, securitySuffix}) => {
    console.log('nice! fetching')
    get(`${API}/job/${slug}`, {params: {securitySuffix}})
    .then(res => {
      console.log(res.data)
      this.job = res.data
    })
  }

  @action handleChange = (e, { name, value, checked }) => {
    this.job[name] = value || checked
  }

  @action save = () => {

  }

}

var store = window.jobStore = new JobStore()

export default store
