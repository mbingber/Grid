import { fbAuth, fbDb } from '../firebase';
import { LOGIN, LOGOUT } from '../constants';

export function listenForAuth() {
  return dispatch => {
    fbAuth().onAuthStateChanged(user => {
      if (user) {
        fbDb.ref(`/users/${user.uid}`).once('value')
          .then(userSnp => {
            const userData = userSnp.val();
            dispatch({
              type: LOGIN,
              payload: {          
                uid: userSnp.key,
                username: userData ? userData.username : null
              }
            });
          })
      } else {
        dispatch({
          type: LOGOUT
        });
      }
    });
  }
}

export function logout() {
  return dispatch => {
    fbAuth().signOut()
  };
}

// NOTE - not a real action creator
export function signIn() {
  const provider = new fbAuth.GoogleAuthProvider();
  fbAuth().signInWithRedirect(provider);
}
