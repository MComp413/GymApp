import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/screen/HomeScreen';
import NewTrainingScreen from './components/screen/NewTrainingScreen';
import EditTrainingScreen from './components/screen/EditTrainingScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HOME" component={HomeScreen}/>
        <Stack.Screen name="NEW" component={NewTrainingScreen}/>
        <Stack.Screen name="EDIT" component={EditTrainingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
