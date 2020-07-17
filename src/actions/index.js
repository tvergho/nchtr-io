/* eslint-disable import/no-cycle */
export const ActionTypes = {
  SET_IMAGE_LOADING: 'SET_IMAGE_LOADING',
  SET_IMAGES: 'SET_IMAGES',
  SET_IMAGE_URLS: 'SET_IMAGE_URLS',
  SET_IMAGE_BASE64: 'SET_IMAGE_BASE64',
  CLEAR_IMAGE_LOADING: 'CLEAR_IMAGE_LOADING',
  SWAP_FILES: 'SWAP_FILES',
  SET_CURRENT_CODE: 'SET_CURRENT_CODE',
};

export * from './file-actions';
export * from './response-actions';
