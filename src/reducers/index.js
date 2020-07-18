// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import FileReducer from './file-reducer';
import FirebaseReducer from './firebase-reducer';

const rootReducer = combineReducers({
  file: FileReducer,
  response: FirebaseReducer,
});

export default rootReducer;
