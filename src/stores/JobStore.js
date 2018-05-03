import { observable } from 'mobx'

class JobStore {
  @observable jobs = []
  @observable job = {
    jobTitle: 'nice'
  }
}

var store = window.JobStore = new JobStore()

export default store
