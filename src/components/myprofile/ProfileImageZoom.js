import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Icon, Button} from 'native-base';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import Modal from './Modal';

import SelectPhoto from './editForms/SelectPhoto';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const ProfileImageZoom = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <>
      {(props.userData.profilePicture === '' ||
        props.userData.profilePicture === null) &&
        props.utils.selectedImage && (
          <>
            <ReactNativeZoomableView
              zoomEnabled={true}
              maxZoom={1.2}
              minZoom={0.5}
              zoomStep={0.25}
              initialZoom={0.9}
              bindToBorders={true}
              style={styles.profileZoomedImageContainer}>
              <Image
                resizeMode="stretch"
                style={styles.profileZoomedImage}
                source={{
                  uri: `data:${props.utils.selectedImage.mime};base64,${
                    props.utils.selectedImage.data
                  }`,
                }}
              />
            </ReactNativeZoomableView>
            <TouchableOpacity style={styles.profileImageScreenSaveBtn}>
              <Text style={styles.profileImageScreenSaveBtnClr}>Save</Text>
            </TouchableOpacity>
          </>
        )}
      {props.userData.profilePicture !== '' &&
        props.userData.profilePicture !== null &&
        !props.utils.selectedImage && (
          <>
            <ReactNativeZoomableView
              zoomEnabled={true}
              maxZoom={1.2}
              minZoom={0.5}
              zoomStep={0.25}
              initialZoom={0.9}
              bindToBorders={true}
              style={styles.profileZoomedImageContainer}>
              <Image
                resizeMode="stretch"
                style={styles.profileZoomedImage}
                source={{
                  uri: props.userData.profilePicture,
                }}
              />
            </ReactNativeZoomableView>
          </>
        )}
      {(props.userData.profilePicture === '' ||
        props.userData.profilePicture === null) &&
        props.utils.selectedImage === null && (
          <View style={styles.profileImageScreenEmptyText}>
            <Text style={[styles.addStoryText, styles.listEmptytxtClr]}>
              Click
            </Text>
            <Icon
              name="plus"
              type="AntDesign"
              style={[styles.addStoryText, styles.listEmptytxtClr]}
            />
            <Text style={[styles.addStoryText, styles.listEmptytxtClr]}>
              {' '}
              to add a picture.
            </Text>
          </View>
        )}
      {props.utils.modalType === 'selectPhoto' && (
        <Modal title="Select a Photo" children={<SelectPhoto />} />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
  userData: state.userData,
});

export default connect(mapStateToProps)(ProfileImageZoom);
