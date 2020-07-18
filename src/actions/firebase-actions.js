/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import { ActionTypes } from './index';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA-y8SIbLVm4m42PGENqJjyWqbc__DLQPA',
  authDomain: 'nchtr-io.firebaseapp.com',
  databaseURL: 'https://nchtr-io.firebaseio.com',
  projectId: 'nchtr-io',
  storageBucket: 'nchtr-io.appspot.com',
  messagingSenderId: '968123397685',
  appId: '1:968123397685:web:5b455fdb26d6fcf4a1237c',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const axios = require('axios');

const API_URL = 'https://zzpl0okib5.execute-api.us-east-1.amazonaws.com/dev';

export function setCurrentCode() {
  return (dispatch, getState) => {
    const { filenames } = getState().file;

    const options = {
      method: 'post',
      url: `${API_URL}/responses`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        filenames,
      },
    };

    axios(options)
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.SET_CURRENT_CODE, payload: response.data.code });
      });
  };
}

export function getFilenamesFromFirebase(id) {
  const screenshotsRef = db.ref('screenshots');

  return (dispatch) => {
    screenshotsRef.child(id).once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          dispatch({ type: ActionTypes.SET_FILENAMES, payload: { filenames: snapshot.child('filenames').val() } });
        }
      });
  };
}

function getChildByIndex(snapshot, index) {
  return Object.keys(snapshot.val())[index];
}

export function getRandomScreenshot() {
  const screenshotsRef = db.ref('screenshots');

  return (dispatch, getState) => {
    screenshotsRef.once('value')
      .then((snapshot) => {
        let rand = Math.floor((Math.random() * snapshot.numChildren()));
        let child = getChildByIndex(snapshot, rand);

        const { shownScreenshots } = getState().response;

        if (shownScreenshots.length < snapshot.numChildren()) {
          while (child in getState().response.shownScreenshots) {
            rand = Math.floor((Math.random() * snapshot.numChildren()));
            child = getChildByIndex(snapshot, rand);
          }
        }

        dispatch({ type: ActionTypes.ADD_SHOWN_SCREENSHOT, payload: child });
        dispatch({ type: ActionTypes.SET_FILENAMES, payload: { filenames: snapshot.child(child).child('filenames').val() } });
      });
  };
}
