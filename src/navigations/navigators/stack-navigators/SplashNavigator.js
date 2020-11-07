import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../../screens/SplashScreen';
const Stack = createStackNavigator();

const SplashNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="splash-screen"
        component={SplashScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SplashNavigator;
