/* eslint-disable import/no-cycle */
export const ActionTypes = {
  SET_IMAGE_LOADING: 'SET_IMAGE_LOADING',
  SET_IMAGES: 'SET_IMAGES',
  SET_IMAGE_URLS: 'SET_IMAGE_URLS',
  SET_IMAGE_BASE64: 'SET_IMAGE_BASE64',
  CLEAR_IMAGE_LOADING: 'CLEAR_IMAGE_LOADING',
  CLEAR_UPLOAD: 'CLEAR_UPLOAD',
  SWAP_FILES: 'SWAP_FILES',
  SET_CURRENT_CODE: 'SET_CURRENT_CODE',
  SET_FILENAMES: 'SET_FILENAMES',
  ADD_SHOWN_SCREENSHOT: 'ADD_SHOWN_SCREENSHOT',
  CLEAR_CODE: 'CLEAR_CODE',
  SET_RESPONSES: 'SET_RESPONSES',
  SET_RESPONSES_LOADING: 'SET_RESPONSES_LOADING',
  CLEAR_FILENAMES: 'CLEAR_FILENAMES',
};

export * from './file-actions';
export * from './firebase-actions';
