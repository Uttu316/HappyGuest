import React from 'react';
import {View, BackHandler, Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  themeStyles,
  darkThemeStyles,
  lightThemeStyles,
} from '../../../styles/Styles';
import {changeTheme} from '../../../redux/actions/UtilsAction';
import {
  changeEmail,
  changePassword,
} from '../../../redux/actions/UserDetailsAction';

import Header from '../../../components/headers/Header';
import SwipeList from '../../../components/home/SwipeList';

const HomeScreen = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on! ', 'Are you sure you want to close the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={[styles.fullScreen, styles.fullScreenBgClr]}>
      <Header
        title="Chats"
        searchIcon={true}
        theme={props.utils.theme}
        {...props}
      />
      <SwipeList theme={props.utils.theme} {...props} />
    </View>
  );
};

const mapStateToProps = state => ({
  state: state.auth,
  utils: state.utils,
  user: state.userData,
});
const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(changeTheme(theme)),
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
