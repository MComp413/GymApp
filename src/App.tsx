import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/screen/HomeScreen';
import NewTrainingScreen from './components/screen/NewTrainingScreen';
import EditTrainingScreen from './components/screen/EditTrainingScreen';
import { StackNavRoutes, StackNavTitles } from './constants/constants';
import { store } from './reducer/reducer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={StackNavRoutes.HOME}
            component={HomeScreen}
            options={{title: StackNavTitles[StackNavRoutes.HOME]}}
          />
          <Stack.Screen
            name={StackNavRoutes.NEW}
            component={NewTrainingScreen}
            options={{title: StackNavTitles[StackNavRoutes.NEW]}}
          />
          <Stack.Screen
            name={StackNavRoutes.EDIT}
            component={EditTrainingScreen}
            options={{title: StackNavTitles[StackNavRoutes.EDIT]}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
