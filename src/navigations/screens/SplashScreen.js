import React from 'react';
import {ImageBackground, View} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import loginBgImage from '../../assets/login.jpg';

const SplashScreen = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <ImageBackground source={null} style={styles.fullScreen}>
      <View style={[styles.mainContainer, styles.bgClr]}>
        <Animatable.Text
          animation="fadeIn"
          style={[styles.appTitle, styles.textClr]}>
          Happy Guest
        </Animatable.Text>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
});

export default connect(mapStateToProps)(SplashScreen);
