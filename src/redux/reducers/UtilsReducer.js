import {utilsActionTypes} from '../ActionTypes';

let initialState = {
  isLoading: false,
  theme: 'light',
  token: null,
  screen: 'Chats', //not used
  modalType: '',
  isModalOpen: false,
  selectedImage: null,
};
export const UtilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case utilsActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
      break;
    case utilsActionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
      break;
    case utilsActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
      break;
    case utilsActionTypes.CHANGE_SCREEN:
      return {
        ...state,
        screen: action.screen,
      };
      break;
    case utilsActionTypes.SHOW_PROFILE_EDIT_MODAL:
      return {
        ...state,
        isModalOpen: action.isModalOpen,
        modalType: action.modalType,
      };
      break;
    case utilsActionTypes.SELECT_IMAGE:
      return {
        ...state,
        selectedImage: action.selectedImage,
      };
      break;
  }
  return state;
};
