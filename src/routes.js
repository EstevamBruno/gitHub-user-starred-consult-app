import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './screens/Main';
import User from './screens/User';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#7159c1' },
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'Usuários',
        }}
      />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

export default Routes;
