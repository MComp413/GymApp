import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

const DetailScreen = (props: { navigation: any }) =>
  <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
    <Text> Details </Text>
    <Button
      title="Go Home"
      onPress={() => props.navigation.navigate("Home")}
    />
  </View>

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
