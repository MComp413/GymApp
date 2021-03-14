import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrainingListScreen from './TrainingListScreen';
import StatsScreen from './StatsScreen';
import ExecuteTrainingScreen from './ExecuteTrainingScreen';
import { TabNavRoutes, TabNavTitles } from '../../constants/constants';

const Tabs = createMaterialTopTabNavigator();

const HomeScreen = ({route, navigation}: any) => {

  return(
    <Tabs.Navigator>
      <Tabs.Screen
        name={TabNavRoutes.STATS}
        component={StatsScreen}
        options={{title: TabNavTitles[TabNavRoutes.STATS]}}
      />
      <Tabs.Screen
        name={TabNavRoutes.LIST}
        component={TrainingListScreen}
        options={{title: TabNavTitles[TabNavRoutes.LIST]}}
      />
      <Tabs.Screen
        name={TabNavRoutes.EXECUTE}
        component={ExecuteTrainingScreen}
        options={{title: TabNavTitles[TabNavRoutes.EXECUTE]}}
      />
    </Tabs.Navigator>  
  );
}

export default HomeScreen;