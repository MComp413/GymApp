import React from 'react';
import { Button, View, Text, StyleSheet } from "react-native";
import { StackNavRoutes, StackNavTitles } from '../../constants/constants';

import { mock } from '../../../res/mockdata';
import TrainingCard from '../org/TrainingCard';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

const TrainingListScreen = ({route, navigation}: any) => {
  const trainingId = mock.trainingList[0].id ? mock.trainingList[0].id : 0;
  return(
    <View style={styles.screen}>
        <View>
          <TrainingCard
            id={trainingId}
          />
        </View>
        <Button
            title={StackNavTitles[StackNavRoutes.NEW]}
            onPress={() => navigation.navigate(StackNavRoutes.NEW)}
        />
    </View>
  );
}

export default TrainingListScreen;
