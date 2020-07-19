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
      url: `${API_URL}/screenshots`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        filenames,
      },
    };

    axios(options)
      .then((response) => {
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

function getUniqueRandomChildKey(snapshot, shownScreenshots) {
  let rand = Math.floor((Math.random() * snapshot.numChildren()));
  let child = Object.keys(snapshot.val())[rand];

  if (shownScreenshots.length < snapshot.numChildren()) {
    while (shownScreenshots.includes(child)) {
      rand = Math.floor((Math.random() * snapshot.numChildren()));
      child = Object.keys(snapshot.val())[rand];
    }
  }
  while (shownScreenshots[shownScreenshots.length - 1] === child) {
    rand = Math.floor((Math.random() * snapshot.numChildren()));
    child = Object.keys(snapshot.val())[rand];
  }

  return child;
}

export function getRandomScreenshot() {
  const screenshotsRef = db.ref('screenshots');

  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.CLEAR_FILENAMES });

    screenshotsRef.once('value')
      .then((snapshot) => {
        const { shownScreenshots } = getState().response;
        const child = getUniqueRandomChildKey(snapshot, shownScreenshots);
        console.log(child);


        dispatch({ type: ActionTypes.ADD_SHOWN_SCREENSHOT, payload: child });
      });
  };
}

export function clearCode() {
  return { type: ActionTypes.CLEAR_CODE };
}

export function getResponsesFromFirebase(id) {
  const responsesRef = db.ref('responses');

  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_RESPONSES_LOADING, payload: true });

    responsesRef.child(id).once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          const responses = [];
          Object.keys(snapshot.val()).sort().forEach((key) => {
            responses.push(snapshot.val()[key]);
          });

          dispatch({ type: ActionTypes.SET_RESPONSES, payload: responses });
        }
      })
      .finally(() => {
        dispatch({ type: ActionTypes.SET_RESPONSES_LOADING, payload: false });
      });
  };
}

export function addResponse(name, message, screenshotId) {
  const options = {
    method: 'post',
    url: `${API_URL}/response`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      name,
      message,
      screenshotId,
    },
  };

  axios(options);
}

export function subscribeToResponses(screenshotId) {
  return (dispatch) => {
    db.ref('responses').child(screenshotId).on('value', (snapshot) => {
      if (snapshot.val()) {
        const responses = [];
        Object.keys(snapshot.val()).sort().forEach((key) => {
          responses.push(snapshot.val()[key]);
        });

        dispatch({ type: ActionTypes.SET_RESPONSES, payload: responses });
      }
    });
  };
}

export function unsubscribeToResponses(screenshotId) {
  if (screenshotId.length > 0) {
    db.ref('responses').child(screenshotId).off();
  }
}

export function incrementShot() {
  return {
    type: ActionTypes.INCREMENT_SHOT,
  };
}

export function decrementShot() {
  return {
    type: ActionTypes.DECREMENT_SHOT,
  };
}
