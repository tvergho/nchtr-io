import { ActionTypes } from '../actions';

const initialState = {
  code: '',
  shownScreenshots: [],
};

const FirebaseReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_CURRENT_CODE:
    return {
      ...state,
      code: action.payload,
    };
  case ActionTypes.ADD_SHOWN_SCREENSHOT: {
    const newShots = [...state.shownScreenshots];
    newShots.push(action.payload);
    return {
      ...state,
      shownScreenshots: newShots,
    };
  }
  default:
    return state;
  }
};

export default FirebaseReducer;
