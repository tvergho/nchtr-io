import { ActionTypes } from '../actions';

const initialState = {
  code: '',
  shownScreenshots: [],
  currentShot: '',
  responses: [],
  responsesLoading: true,
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
      currentShot: action.payload,
    };
  }
  case ActionTypes.CLEAR_CODE:
    return {
      ...state,
      code: '',
    };
  case ActionTypes.SET_RESPONSES:
    return {
      ...state,
      responses: action.payload,
    };
  case ActionTypes.SET_RESPONSES_LOADING:
    return {
      ...state,
      responsesLoading: action.payload,
    };
  default:
    return state;
  }
};

export default FirebaseReducer;
