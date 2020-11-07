import React from 'react';
import HomeNavigator from '../stack-navigators/home/HomeNavigator';
import StoriesNavigator from '../stack-navigators/stories/StoriesNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomBar from '../../../components/customTabBar/CustomTabBar';
import Animated from 'react-native-reanimated';
import {themeStyles} from '../../../styles/Styles';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = props => {
  const scale = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const animatedStyle = {transform: [{scale}]};

  return (
    <Animated.View style={[themeStyles.drawerAnimation, animatedStyle]}>
      <Tab.Navigator
        initialRouteName="home"
        tabBar={props => <CustomBottomBar {...props} />}>
        <Tab.Screen
          name="home"
          component={HomeNavigator}
          options={{
            tabBarLabel: 'Chats',
          }}
        />
        <Tab.Screen
          name="home-stories"
          component={StoriesNavigator}
          options={{
            tabBarLabel: 'Stories',
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};
export default BottomTabNavigator;
