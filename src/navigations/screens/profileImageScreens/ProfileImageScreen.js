import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../../styles/Styles';
import ProfileImageZoom from '../../../components/myprofile/ProfileImageZoom';
const ProfileImageScreen = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <View style={[styles.fullScreen, styles.profileImageScreenBgClr]}>
      <ProfileImageZoom />
    </View>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
});

export default connect(mapStateToProps)(ProfileImageScreen);
