import React from "react";
import { Button, View, Text } from "react-native";
import { Exercise } from "../../constants/types";
import { HeaderStyles } from "../../styles/styles";

const ExerciseHeader = (props: {expanded?: boolean} & Exercise) => {
  const {name, details, expanded} = props;
  return(
    <View>
      <Text style={HeaderStyles.exerciseName}>
        {name}
      </Text>
      {expanded && 
        <Text style={HeaderStyles.exerciseDetails}>
          {details}
        </Text>
      }
    </View>
  )
}

export default ExerciseHeader;