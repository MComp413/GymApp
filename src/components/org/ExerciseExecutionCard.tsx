import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { mock } from '../../../res/mockdata';
import { Exercise } from '../../constants/types';
import ExerciseHeader from '../atom/ExerciseHeader';

const ExerciseExecutionCard = (props: {exercise: Exercise, checked?: boolean, onToggle: () => void}) => {
  const {exercise, checked, onToggle} = props;
  const {id, name, details, trainingId} = exercise;
  return(
    <View>
      <ExerciseHeader
        id={id}
        name={name}
        details={details}
        trainingId={trainingId}
      />
      <Button
        title={checked ? "done" : "todo"}
        onPress={() => onToggle()}
      />
    </View>
  )
}

export default ExerciseExecutionCard;