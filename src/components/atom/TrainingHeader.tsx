import React from "react";
import { Button, View, Text } from "react-native";
import { Training } from "../../constants/types";
import { HeaderStyles } from "../../styles/styles";

const TrainingHeader = (props: {expanded?: boolean} & Training) => {
  const {name, details, expanded} = props;
  return(
    <View>
      <Text style={HeaderStyles.trainingName}>
        {name}
      </Text>
      {expanded && 
        <Text style={HeaderStyles.trainingDetails}>
          {details}
        </Text>
      }
    </View>
  )
}

export default TrainingHeader;