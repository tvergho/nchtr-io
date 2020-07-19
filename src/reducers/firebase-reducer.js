import { ActionTypes } from '../actions';

const initialState = {
  code: '',
  shownScreenshots: [],
  currentShot: '',
  responses: [],
  responsesLoading: true,
  currentShowIndex: 0,
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
      currentShowIndex: newShots.length - 1,
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
  case ActionTypes.INCREMENT_SHOT: {
    if (state.currentShowIndex < state.shownScreenshots.length - 1) {
      return {
        ...state,
        currentShowIndex: state.currentShowIndex + 1,
        currentShot: state.shownScreenshots[state.currentShowIndex + 1],
      };
    } else {
      return {
        ...state,
      };
    }
  }
  case ActionTypes.DECREMENT_SHOT: {
    if (state.currentShowIndex > 0) {
      return {
        ...state,
        currentShowIndex: state.currentShowIndex - 1,
        currentShot: state.shownScreenshots[state.currentShowIndex - 1],
      };
    } else {
      return {
        ...state,
      };
    }
  }
  default:
    return state;
  }
};

export default FirebaseReducer;
