import React from 'react';
import { Button, View, Text } from "react-native";

const TrainingListScreen = ({route, navigation}: any) => {
  return(
    <View>
        <Text> TODO: List </Text>
        <Button
            title="Edit"
            onPress={() => navigation.navigate("EDIT")}
        />
        <Button
            title="New"
            onPress={() => navigation.navigate("NEW")}
        />
    </View>
  );
}

export default TrainingListScreen;
