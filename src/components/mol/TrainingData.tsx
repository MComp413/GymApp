import React from 'react';
import { View } from 'react-native';
import { Exercise, Training } from '../../constants/types';
import ExerciseHeader from '../atom/ExerciseHeader';
import TrainingHeader from '../atom/TrainingHeader';

const TrainingData = (props: Training & {exerciseList: Exercise[]}) => {
  const {id, name, details, exerciseList} = props;
  return(
    <View>
      <TrainingHeader
        id={id}
        name={name}
        details={details}
        expanded={true}
      />
      {exerciseList.map((exercise, index) =>
        <View key={index}>
          <ExerciseHeader
            id={exercise.id}
            name={exercise.name}
            details={exercise.details}
            expanded={false}
            trainingId={id}
          />
        </View>
      )}
    </View>
  )
}

export default TrainingData;