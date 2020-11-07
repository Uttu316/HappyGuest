import {authActionTypes} from '../ActionTypes';

export const showError = (errorType, error) => {
  return {
    type: authActionTypes.SHOW_ERROR,
    errorType: errorType,
    error: error,
  };
};
export const changeAnimation = (animation, delay) => {
  return {
    type: authActionTypes.CHANGE_ANIMATION,
    animation: animation,
    delay: delay,
  };
};

export const changeForm = currentForm => {
  return {
    type: authActionTypes.CHANGE_FORM,
    currentForm: currentForm,
  };
};
