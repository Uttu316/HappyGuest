import {utilsActionTypes} from '../ActionTypes';

export const setLoading = isLoading => {
  return {
    type: utilsActionTypes.SET_LOADING,
    isLoading: isLoading,
  };
};

export const changeTheme = theme => {
  return {
    type: utilsActionTypes.CHANGE_THEME,
    theme: theme,
  };
};

export const setToken = token => {
  return {
    type: utilsActionTypes.SET_TOKEN,
    token: token,
  };
};

export const changeScreen = screen => {
  return {
    type: utilsActionTypes.CHANGE_SCREEN,
    screen: screen,
  };
};

export const showProfileEditModal = (isModalOpen, modalType) => {
  return {
    type: utilsActionTypes.SHOW_PROFILE_EDIT_MODAL,
    isModalOpen: isModalOpen,
    modalType: modalType,
  };
};
export const selectImage = selectedImage => {
  return {
    type: utilsActionTypes.SELECT_IMAGE,
    selectedImage: selectedImage,
  };
};
