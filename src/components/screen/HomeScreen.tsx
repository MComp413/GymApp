import React from 'react';
import { Button, View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrainingListScreen from "./TrainingListScreen";
import StatsScreen from "./StatsScreen";
import ExecuteTrainingScreen from "./ExecuteTrainingScreen";

const Tabs = createMaterialTopTabNavigator();

const HomeScreen = ({route, navigation}: any) => {
  return(
    <Tabs.Navigator>
        <Tabs.Screen name="LIST" component={TrainingListScreen}/>
        <Tabs.Screen name="STATS" component={StatsScreen}/>
        <Tabs.Screen name="EXECUTE" component={ExecuteTrainingScreen}/>
    </Tabs.Navigator>  
  );
}



export default HomeScreen;