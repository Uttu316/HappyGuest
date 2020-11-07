import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StoriesScreen from '../../../screens/stories/StoriesScreen';
const Stack = createStackNavigator();

const StoriesNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="stories" component={StoriesScreen} />
    </Stack.Navigator>
  );
};

export default StoriesNavigator;
