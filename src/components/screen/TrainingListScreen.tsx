import React from 'react';
import { Button, View, Text, StyleSheet } from "react-native";
import { StackNavRoutes, StackNavTitles } from '../../constants/constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  }
})

const TrainingListScreen = ({route, navigation}: any) => {
  return(
    <View style={styles.screen}>
        <Text> TODO: List </Text>
        <Button
            title={StackNavTitles[StackNavRoutes.EDIT]}
            onPress={() => navigation.navigate(StackNavRoutes.EDIT)}
        />
        <Button
            title={StackNavTitles[StackNavRoutes.NEW]}
            onPress={() => navigation.navigate(StackNavRoutes.NEW)}
        />
    </View>
  );
}

export default TrainingListScreen;
