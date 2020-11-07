import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Text, View} from 'native-base';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../../styles/Styles';
import {
  changeUserName,
  changeUserBio,
} from '../../../redux/actions/UserDetailsAction';
import {selectImage} from '../../../redux/actions/UtilsAction';
import ImagePicker from 'react-native-image-crop-picker';

import {showProfileEditModal} from '../../../redux/actions/UtilsAction';

const SelectPhoto = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  function openLocalFilePicker() {
    props.showProfileEditModal(!props.utils.isModalOpen, '');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
    })
      .then(image => {
        console.log(image, 'openLocalFilePicker');
        props.selectImage(image);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function openCamera() {
    props.showProfileEditModal(!props.utils.isModalOpen, '');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
    })
      .then(image => {
        console.log(image, 'camera');
        props.selectImage(image);
      })
      .catch(err => {
        console.log(err);
      });
  }
  console.log(props.utils.selectedImage);
  return (
    <>
      <View style={styles.selectPhotoContainer}>
        <TouchableOpacity
          style={styles.selectPhotoContainerBtn}
          onPress={() => openLocalFilePicker()}>
          <Icon
            name="folder-images"
            type="Entypo"
            style={styles.selectPhotoContainerIcon}
          />
          <Text style={{color: 'grey'}}>Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectPhotoContainerBtn}
          onPress={() => openCamera()}>
          <Icon
            name="camera"
            type="Entypo"
            style={styles.selectPhotoContainerIcon}
          />
          <Text style={{color: 'grey'}}>Camera</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const mapStateToProps = state => ({
  userData: state.userData,
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  selectImage: selectedImage => dispatch(selectImage(selectedImage)),
  showProfileEditModal: (isModalOpen, modalType) =>
    dispatch(showProfileEditModal(isModalOpen, modalType)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectPhoto);
