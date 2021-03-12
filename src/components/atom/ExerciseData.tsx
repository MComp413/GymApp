import React from "react";
import { Button, View, Text } from "react-native";
import { Exercise } from "../../constants/types";

const ExerciseData = (props: {expanded?: boolean} & Exercise) => {
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

export default ExerciseData;