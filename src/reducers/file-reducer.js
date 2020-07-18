import { ActionTypes } from '../actions';

const initialState = {
  loading: [],
  files: [],
  uploadUrls: [],
  filenames: [],
  base64: [],
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
  case ActionTypes.SET_FILENAMES: {
    const { filenames } = action.payload;
    return {
      ...state,
      filenames,
    };
  }
  case ActionTypes.SET_IMAGES: {
    return {
      ...state,
      files: action.payload,
    };
  }
  case ActionTypes.SET_IMAGE_BASE64: {
    return {
      ...state,
      base64: action.payload,
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
  case ActionTypes.CLEAR_IMAGE_LOADING:
    return {
      ...state,
      loading: [],
    };
  case ActionTypes.CLEAR_UPLOAD:
    return {
      ...state,
      filenames: [],
      uploadUrls: [],
      files: [],
    };
  case ActionTypes.SWAP_FILES: {
    const newFiles = [...state.files];
    const newNames = [...state.filenames];
    const { i, j } = action.payload;

    const tempFile = newFiles[i];
    newFiles[i] = newFiles[j];
    newFiles[j] = tempFile;

    const tempName = newNames[i];
    newNames[i] = newNames[j];
    newNames[j] = tempName;

    return {
      ...state,
      files: newFiles,
      filenames: newNames,
    };
  }
  default:
    return state;
  }
};

export default FileReducer;
