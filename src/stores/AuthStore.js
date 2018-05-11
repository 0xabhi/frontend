import { get as ENV } from 'react-global-configuration'
import firebase from 'firebase'
import 'firebase/firestore'
import { initFirestorter, Collection, Document } from 'firestorter'
import { observable, action } from 'mobx'
import { get, post, put, patch } from 'axios'
const API = ENV('apiDomain')

if (!firebase.apps.length) {
  firebase.initializeApp(ENV('firebase'))
  initFirestorter({firebase})
}

const githubProvider = new firebase.auth.GithubAuthProvider()

class AuthStore {
  @observable loading = false
  @observable _changes = []
  @observable user = {}


  @action signin = () => {
    this.loading = true
    firebase.auth()
    .signInWithPopup(githubProvider)
    // .signInWithRedirect(githubProvider)
    .then((result) => {
      const token = result.credential.accessToken;
      this.loading = false
      log('signin result', result)
    })
    .catch(handleAuthError)
  }

  @action signout = () => {
    firebase.auth().signOut()
    .catch(handleAuthError)
  }
}

const handleAuthError = (error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
  authStore.loading = false
  log('auth error', error)
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData } = user
    authStore.user = user
    log('signed in', user)
  } else {
    authStore.user = user
    log('signed out', user)
  }
});

const authStore = new AuthStore()
export default authStore
