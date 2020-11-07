import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import AuthNavigator from './stack-navigators/AuthNavigator';
import SplashNavigator from './stack-navigators/SplashNavigator';
import DrawerNavigator from '../navigators/drawer-navigators/DrawerNavigator';
import MyProfileScreen from '../screens/drawerScreens/MyProfileScreen';
import SettingsScreen from '../screens/drawerScreens/SettingsScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileImageScreen from '../screens/profileImageScreens/ProfileImageScreen';
import {connect} from 'react-redux';
import {
  setLoading,
  setToken,
  showProfileEditModal,
} from '../../redux/actions/UtilsAction';

import {
  setUserId,
  changeEmail,
  changePassword,
  changeBirthData,
  changeGender,
  changeCompany,
  changePhoneNumber,
  changeAddress,
  changeUserBio,
  changeUserName,
} from '../../redux/actions/UserDetailsAction';
import AsyncStorage from '@react-native-community/async-storage';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
const Stack = createStackNavigator();

const RootNavigator = props => {
  const [hidesplash, showSplash] = React.useState(false);
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  async function fetchToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      let userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData);

      if (token && userData) {
        props.setToken(token);
        props.changeEmail(userData.email);
        props.changePassword(userData.password);

        props.changeAddress(
          userData.current_address,
          userData.permanent_address,
        );
        props.setUserId(userData.userId);
        props.changePhoneNumber(userData.phone);
        props.changeUserName(userData.user_name);
        props.changeGender(userData.gender);
        props.changeUserBio(userData.bio);
        props.changeBirthData(userData.dob);
        props.changeCompany(userData.company);
      } else {
        props.setToken(null);
      }
      showSplash(true);
    } catch (error) {
      console.log('fetch token', error);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      fetchToken();
    }, 600);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!hidesplash ? (
          <Stack.Screen
            name="splash"
            component={SplashNavigator}
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          />
        ) : (
          <>
            {!props.utils.token ? (
              <Stack.Screen
                name="auth"
                component={AuthNavigator}
                options={{
                  animationEnabled: false,
                  headerShown: false,
                }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="drawer"
                  component={DrawerNavigator}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="chat-room"
                  component={SplashScreen}
                  options={{
                    headerTitle: 'Chat Room',
                  }}
                />
                <Stack.Screen
                  name="notifications"
                  component={SplashScreen}
                  options={{
                    headerTitle: 'Notifications',
                    gestureEnabled: true,
                    ...MyTransition,
                  }}
                />
                <Stack.Screen
                  name="profile"
                  component={MyProfileScreen}
                  options={{
                    headerTitle: 'Profile',
                    headerTitleAlign: 'left',
                    headerTitleContainerStyle: {
                      left: 40,
                    },

                    headerTintColor: styles.textClr.color,
                    headerStyle: [styles.headerClr, styles.drawerScreenHeader],
                    headerTitleStyle: [
                      styles.headerTitle,
                      styles.headerTitleClr,
                    ],
                    gestureEnabled: true,
                    ...MyTransition,
                  }}
                />
                <Stack.Screen
                  name="settings"
                  component={SettingsScreen}
                  options={{
                    headerTitle: 'Settings',
                    headerTitleAlign: 'left',
                    headerTitleContainerStyle: {
                      left: 40,
                    },
                    headerTintColor: styles.textClr.color,
                    headerStyle: [styles.headerClr, styles.drawerScreenHeader],
                    headerTitleStyle: [
                      styles.headerTitle,
                      styles.headerTitleClr,
                    ],
                    gestureEnabled: true,
                    ...MyTransition,
                  }}
                />

                <Stack.Screen
                  name="profile-image"
                  component={ProfileImageScreen}
                  options={{
                    headerTitle: '',
                    headerTintColor: '#ffffff',
                    headerStyle: [
                      styles.profileImageScreenBgClr,
                      styles.drawerScreenHeader,
                      {borderBottomWidth: 2, borderBottomColor: 'white'},
                    ],
                    headerRight: () => (
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() =>
                            props.showProfileEditModal(
                              !props.utils.isModalOpen,
                              'selectPhoto',
                            )
                          }>
                          {props.userData.profilePicture !== '' &&
                          props.userData.profilePicture !== null ? (
                            <Icon
                              name="pencil"
                              type="SimpleLineIcons"
                              style={styles.profileImageScreenHeaderIcon}
                            />
                          ) : (
                            <Icon
                              name="plus"
                              type="AntDesign"
                              style={styles.profileImageScreenHeaderIcon}
                            />
                          )}
                        </TouchableOpacity>
                        {props.userData.profilePicture !== '' &&
                          props.userData.profilePicture !== null && (
                            <TouchableOpacity>
                              <Icon
                                name="delete"
                                type="MaterialIcons"
                                style={styles.profileImageScreenHeaderIcon}
                              />
                            </TouchableOpacity>
                          )}
                      </View>
                    ),

                    gestureEnabled: true,
                    ...MyTransition,
                  }}
                />
                <Stack.Screen
                  name="auth"
                  component={AuthNavigator}
                  options={{
                    animationEnabled: false,
                    headerShown: false,
                  }}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
  userData: state.userData,
});
const mapDispatchToProps = dispatch => ({
  setLoading: isLoading => dispatch(setLoading(isLoading)),
  setToken: token => dispatch(setToken(token)),
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
  changeBirthData: dob => dispatch(changeBirthData(dob)),
  changePhoneNumber: phoneNumber => dispatch(changePhoneNumber(phoneNumber)),
  changeGender: gender => dispatch(changeGender(gender)),
  changeAddress: (currAddress, permanentAddress) =>
    dispatch(changeAddress(currAddress, permanentAddress)),
  changeUserBio: bio => dispatch(changeUserBio(bio)),
  changeCompany: company => dispatch(changeCompany(company)),
  changeUserName: name => dispatch(changeUserName(name)),
  setUserId: userId => dispatch(setUserId(userId)),
  showProfileEditModal: (isModalOpen, modalType) =>
    dispatch(showProfileEditModal(isModalOpen, modalType)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNavigator);

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [-1, layouts.screen.width, 0],
            }),
          },

          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
    };
  },
};
