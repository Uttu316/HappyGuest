import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../../styles/Styles';
import Myprofile from '../../../components/myprofile/Myprofile';
const MyProfileScreen = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <View style={[styles.fullScreen, styles.fullScreenBgClr]}>
      <Myprofile {...props} />
    </View>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
});

export default connect(mapStateToProps)(MyProfileScreen);
