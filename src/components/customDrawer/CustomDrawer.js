import React from 'react';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import {connect} from 'react-redux';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Text, View, Alert} from 'react-native';
import {Thumbnail, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {setToken, changeTheme} from '../../redux/actions/UtilsAction';
import DummyImage from '../../assets/Dummy-Person.png';

const CustomDrawer = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  async function handleLogOut() {
    await props.navigation.toggleDrawer();
    Alert.alert('Hold on!', 'Are you sure you want to Logout?', [
      {
        text: 'Logout',
        onPress: () => {
          props.changeTheme('light');
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('userData');
          props.setToken(null);
          props.navigation.navigate('auth', {
            screen: 'auth-login',
          });
        },
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
  }
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={[styles.drawerHeader, styles.drawerHeaderBgClr]}>
          {props.userData.profilePicture !== '' &&
          props.userData.profilePicture !== null ? (
            <Thumbnail
              large
              source={{
                uri: props.userData.profilePicture,
              }}
            />
          ) : (
            <Thumbnail large source={DummyImage} />
          )}
          <Text style={[styles.drawerHeaderTxt, styles.drawerHeaderTxtClr]}>
            {props.userData.userName}
          </Text>
        </View>
        <View style={styles.drawerBodyBgClr}>
          <DrawerItem
            label={() => <Text style={styles.textClr}>My profile</Text>}
            style={styles.drawerBodyItem}
            icon={() => (
              <Icon
                name="person-outline"
                type="MaterialIcons"
                style={styles.drawerBodyTxtClr}
              />
            )}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate('profile');
            }}
          />
          <DrawerItem
            label={() => <Text style={styles.textClr}>Settings</Text>}
            style={styles.drawerBodyItem}
            icon={() => (
              <Icon
                name="settings"
                type="SimpleLineIcons"
                style={styles.drawerBodyTxtClr}
              />
            )}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate('settings');
            }}
          />
          <DrawerItem
            label={() => <Text style={styles.textClr}>Logout</Text>}
            style={styles.drawerBodyItem}
            icon={() => (
              <Icon
                name="logout"
                type="SimpleLineIcons"
                style={styles.drawerBodyTxtClr}
              />
            )}
            onPress={() => handleLogOut()}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
const mapStateToProps = state => ({
  utils: state.utils,
  userData: state.userData,
});
const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  changeTheme: theme => dispatch(changeTheme(theme)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawer);
