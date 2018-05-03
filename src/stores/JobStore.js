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

  employmentTypeOptions = employmentTypeOptions
  jobCategories = jobCategories
}

const employmentTypeOptions = [
  {key: 'FULL_TIME', value: 'FULL_TIME', text: 'Full-time'},
  {key: 'CONTRACTOR', value: 'CONTRACTOR', text: 'Contractor'},
  {key: 'INTERN', value: 'INTERN', text: 'Intern'},
  {key: 'OTHER', value: 'OTHER', text: 'Other'},
]
const jobCategories = [
  {key: 'Engineering', value: 'Engineering', text: '🛠 Engineering'},
  {key: 'Design', value: 'Design', text: '🎨 Design / Product'},
  {key: 'Trading', value: 'Trading', text: '🤑 Trading / Crypto Research'},
  {key: 'Community', value: 'Community', text: '💬 Community'},
  {key: 'Content', value: 'Content', text: '✍️ Content'},
  {key: 'Marketing', value: 'Marketing', text: '📈 Marketing'},
  {key: 'Memes', value: 'Memes', text: '🐸 Memes, gifs, glitter'},
  {key: 'Executive', value: 'Executive', text: '💼 Executive'},
  {key: 'Other', value: 'Other', text: 'Other…'},
]

var store = window.jobStore = new JobStore()

export default store
