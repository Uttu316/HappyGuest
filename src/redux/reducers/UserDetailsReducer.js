import {userDetailsActionTypes} from '../ActionTypes';

let initialState = {
  userId: '',
  userName: '',
  userBio: '',
  email: '',
  password: '',
  phoneNumber: '',
  birthDate: '',
  profilePicture: '',
  gender: '',
  company: '',
  currentAddress: '',
  permanentAddress: '',
};
export const UserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case userDetailsActionTypes.SET_USER_ID:
      return {...state, userId: action.userId};

    case userDetailsActionTypes.CHANGE_USER_NAME:
      return {...state, userName: action.userName};

    case userDetailsActionTypes.CHANGE_USER_BIO:
      return {...state, userBio: action.userBio};

    case userDetailsActionTypes.CHANGE_EMAIL:
      return {...state, email: action.email};

    case userDetailsActionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case userDetailsActionTypes.CHANGE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
      break;
    case userDetailsActionTypes.CHANGE_BIRTH_DATE:
      return {
        ...state,
        birthDate: action.birthDate,
      };
      break;
    case userDetailsActionTypes.CHANGE_GENDER:
      return {
        ...state,
        gender: action.gender,
      };
      break;
    case userDetailsActionTypes.CHANGE_ADDRESS:
      return {
        ...state,
        currentAddress: action.currentAddress,
        permanentAddress: action.permanentAddress,
      };
      break;
    case userDetailsActionTypes.CHANGE_COMPANY:
      return {
        ...state,
        company: action.company,
      };
      break;
  }
  return state;
};
