import { ActionTypes } from '../actions';

const initialState = {
  loading: [],
  files: [],
  uploadUrls: [],
  filenames: [],
};

const FileReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_IMAGE_URLS: {
    const { urls, names } = action.payload;
    return {
      ...state,
      uploadUrls: urls,
      filenames: names,
    };
  }
  case ActionTypes.SET_IMAGES: {
    return {
      ...state,
      files: action.payload,
    };
  }
  case ActionTypes.SET_IMAGE_LOADING: {
    const { index, progressEvent } = action.payload;
    const { loaded, total } = progressEvent;
    const newLoading = [...state.loading];
    newLoading[index] = loaded / total;

    return {
      ...state,
      loading: newLoading,
    };
  }
  default:
    return state;
  }
};

export default FileReducer;
