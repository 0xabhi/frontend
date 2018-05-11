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
      log('signin', result)
      var token = result.credential.accessToken;
      var user = result.user;
      this.loading = false
    })
    .catch(handleAuthError)
  }

  @action signout = () => {
    firebase.auth()
    .signOut()
    .then(() => {
      log('signed out', arguments)
    })
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

firebase.auth()
.onAuthStateChanged((user) => {
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    log('onAuthStateChanged', user)
    authStore.user = user
  } else {
    authStore.user = user
    log('onAuthStateChanged logged out', user)
  }
});

const authStore = new AuthStore()
export default authStore
