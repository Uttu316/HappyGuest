import React from 'react';
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigations/navigators/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
