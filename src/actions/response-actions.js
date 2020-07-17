/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { ActionTypes } from './index';

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
