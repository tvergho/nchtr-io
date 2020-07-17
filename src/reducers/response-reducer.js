import { ActionTypes } from '../actions';

const initialState = {
  code: '',
};

const ResponseReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_CURRENT_CODE:
    return {
      ...state,
      code: action.payload,
    };
  default:
    return state;
  }
};

export default ResponseReducer;
