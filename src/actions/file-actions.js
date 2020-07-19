/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { ActionTypes } from './index';

const axios = require('axios');

const API_URL = 'https://zzpl0okib5.execute-api.us-east-1.amazonaws.com/dev';

function _base64ToArrayBuffer(base64) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function upload(useBase64) {
  return (dispatch, getState) => {
    if (!useBase64) {
      const { files, uploadUrls } = getState().file;

      for (let i = 0; i < files.length; i += 1) {
        const reader = new FileReader();

        reader.onload = () => {
          const options = {
            method: 'put',
            url: uploadUrls[i],
            data: reader.result,
            headers: {
              'Content-Type': files[i].type,
              'x-amz-acl': 'public-read',
            },
            onUploadProgress: (progressEvent) => dispatch({ type: ActionTypes.SET_IMAGE_LOADING, payload: { index: i, progressEvent } }),
          };

          axios(options)
            .catch((error) => { console.log(error); });
        };
        reader.readAsArrayBuffer(files[i]);
      }
    } else {
      const { base64, uploadUrls, files } = getState().file;

      for (let i = 0; i < base64.length; i += 1) {
        const byteArray = _base64ToArrayBuffer(base64[i].split(',')[1]);
        const options = {
          method: 'put',
          url: uploadUrls[i],
          data: byteArray,
          headers: {
            'Content-Type': files[i].type,
            'x-amz-acl': 'public-read',
          },
          onUploadProgress: (progressEvent) => dispatch({ type: ActionTypes.SET_IMAGE_LOADING, payload: { index: i, progressEvent } }),
        };

        axios(options)
          .catch((error) => { console.log(error); });
      }
    }
  };
}

export function uploadImages(files) {
  const extensions = [];
  const fileTypes = [];
  for (const file of files) {
    const fileType = file.type;
    const split = file.name.split('.');
    const extension = split[split.length - 1];

    extensions.push(extension);
    fileTypes.push(fileType);
  }

  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_IMAGES, payload: files });

    const options = {
      method: 'post',
      url: `${API_URL}/signedurl`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        fileTypes,
        extensions,
      },
    };
    axios(options)
      .then((response) => {
        const { uploadURLs, acceptedFilenames, token } = response.data;
        dispatch({ type: ActionTypes.SET_IMAGE_URLS, payload: { urls: uploadURLs, names: acceptedFilenames } });
        sessionStorage.setItem('uploadToken', token);
        dispatch(upload());
      });
  };
}

export function updateImages(fileUrls) {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SET_IMAGE_BASE64, payload: fileUrls });
    dispatch(clearLoading());

    const { filenames } = getState().file;

    const options = {
      method: 'post',
      url: `${API_URL}/update`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('uploadToken'),
      },
      data: {
        filenames,
      },
    };

    axios(options)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_IMAGE_URLS, payload: { urls: response.data.uploadURLs, names: filenames } });
        console.log(response.data.uploadURLs);
        dispatch(upload(true));
      });
  };
}

export function clearLoading() {
  return { type: ActionTypes.CLEAR_IMAGE_LOADING };
}

export function clearFilenames() {
  return { type: ActionTypes.CLEAR_FILENAMES };
}

export function clearUpload() {
  return { type: ActionTypes.CLEAR_UPLOAD };
}

export function swapFiles(i, j) {
  return {
    type: ActionTypes.SWAP_FILES,
    payload: {
      i,
      j,
    },
  };
}
