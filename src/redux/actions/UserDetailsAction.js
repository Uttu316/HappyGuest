import {userDetailsActionTypes} from '../ActionTypes';

export const setUserId = userId => {
  return {
    type: userDetailsActionTypes.SET_USER_ID,
    userId: userId,
  };
};
export const changeUserName = userName => {
  return {
    type: userDetailsActionTypes.CHANGE_USER_NAME,
    userName: userName,
  };
};
export const changeUserBio = userBio => {
  return {
    type: userDetailsActionTypes.CHANGE_USER_BIO,
    userBio: userBio,
  };
};
export const changeEmail = email => {
  return {
    type: userDetailsActionTypes.CHANGE_EMAIL,
    email: email,
  };
};
export const changePassword = password => {
  return {
    type: userDetailsActionTypes.CHANGE_PASSWORD,
    password: password,
  };
};
export const changePhoneNumber = phoneNumber => {
  return {
    type: userDetailsActionTypes.CHANGE_PHONE_NUMBER,
    phoneNumber: phoneNumber,
  };
};
export const changeBirthData = birthDate => {
  return {
    type: userDetailsActionTypes.CHANGE_BIRTH_DATE,
    birthDate: birthDate,
  };
};

export const changeAddress = (currentAddress, permanentAddress) => {
  return {
    type: userDetailsActionTypes.CHANGE_ADDRESS,
    currentAddress: currentAddress,
    permanentAddress: permanentAddress,
  };
};

export const changeCompany = company => {
  return {
    type: userDetailsActionTypes.CHANGE_COMPANY,
    company: company,
  };
};
export const changeGender = gender => {
  return {
    type: userDetailsActionTypes.CHANGE_GENDER,
    gender: gender,
  };
};
