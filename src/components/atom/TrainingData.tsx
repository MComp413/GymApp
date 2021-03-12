import React from "react";
import { Button, View, Text } from "react-native";
import { Training } from "../../constants/types";

const TrainingData = (props: {expanded?: boolean} & Training) => {
  const {name, details, expanded} = props;
  return(
    <>
    <Text> {name} </Text>
    { expanded && 
      <Text> {details} </Text>
    }
    </>
  )
}

export default TrainingData;