import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../../styles/Styles';
import Settings from '../../../components/settings/Setting';
import Setting from '../../../components/settings/Setting';
const SettingsScreen = (props) => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <View style={[styles.fullScreen, styles.fullScreenBgClr]}>
      <Setting />
    </View>
  );
};

const mapStateToProps = (state) => ({
  utils: state.utils,
});

export default connect(mapStateToProps)(SettingsScreen);
