// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import FileReducer from './file-reducer';
import ResponseReducer from './response-reducer';

const rootReducer = combineReducers({
  file: FileReducer,
  response: ResponseReducer,
});

export default rootReducer;
