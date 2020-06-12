import React from 'react';

import './config/ReactotronConfig';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
