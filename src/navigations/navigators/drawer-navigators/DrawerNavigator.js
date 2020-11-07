import * as React from 'react';
import {connect} from 'react-redux';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../../styles/Styles';
import Animated from 'react-native-reanimated';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from '../tab-navigators/BottomTabNavigator';
import CustomDrawer from '../../../components/customDrawer/CustomDrawer';
const Drawer = createDrawerNavigator();

const DrawerNavigator = props => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={[styles.drawerBodyBgClr, styles.drawerBody]}
      drawerContent={props => {
        setProgress(props.progress);
        return <CustomDrawer {...props} />;
      }}>
      <Drawer.Screen name="main">
        {props => <BottomTabNavigator {...props} progress={progress} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
const mapStateToProps = state => ({
  utils: state.utils,
});

export default connect(mapStateToProps)(DrawerNavigator);
