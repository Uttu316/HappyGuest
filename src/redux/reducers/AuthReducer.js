import {authActionTypes} from '../ActionTypes';

let initialState = {
  errorType: '',
  error: '',
  animation: 'zoomInUp',
  delay: 500,
  currentForm: 'login',
  loading: false,
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.SHOW_ERROR:
      return {...state, errorType: action.errorType, error: action.error};
      break;
    case authActionTypes.CHANGE_ANIMATION:
      return {
        ...state,
        animation: action.animation,
        delay: action.delay,
      };
      break;
    case authActionTypes.CHANGE_FORM:
      return {
        ...state,
        currentForm: action.currentForm,
      };
  }
  return state;
};
