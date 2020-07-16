// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import FileReducer from './file-reducer';

const rootReducer = combineReducers({
  file: FileReducer,
});

export default rootReducer;
