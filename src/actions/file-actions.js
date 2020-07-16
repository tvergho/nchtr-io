/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { ActionTypes } from './index';

const axios = require('axios');

const API_URL = 'https://zzpl0okib5.execute-api.us-east-1.amazonaws.com/dev';

function upload() {
  return (dispatch, getState) => {
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
        const { uploadURLs, acceptedFilenames } = response.data;
        dispatch({ type: ActionTypes.SET_IMAGE_URLS, payload: { urls: uploadURLs, names: acceptedFilenames } });
        dispatch(upload());
      });
  };
}
