import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../../screens/home/HomeScreen';
const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="chats"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
