import React from 'react';
import {ImageBackground, View} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {
  themeStyles,
  darkThemeStyles,
  lightThemeStyles,
} from '../../styles/Styles';
import Login from '../../components/auth/Login';
import ForgetPassword from '../../components/auth/ForgetPassword';
import loginBgImage from '../../assets/login.jpg';
import {changeTheme} from '../../redux/actions/UtilsAction';
const LoginScreen = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  return (
    <ImageBackground source={null} style={styles.fullScreen}>
      <View style={[styles.mainContainer, styles.bgClr]}>
        <Animatable.Text
          animation={'bounceInDown'}
          duration={1500}
          style={[styles.appTitle, styles.textClr]}>
          Happy Guest
        </Animatable.Text>
        {props.state.currentForm === 'login' ? (
          <Login navigation={props.navigation} />
        ) : (
          <ForgetPassword />
        )}
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  state: state.auth,
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(changeTheme(theme)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
