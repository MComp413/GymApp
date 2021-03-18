import React, { useEffect, useState } from 'react';
import { Button, View, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { Exercise } from '../../constants/types';
import { actionBuilders } from '../../reducer/actions';
import { IState } from '../../reducer/state';
import TrainingHeader from '../atom/TrainingHeader';
import { ExecutionFooter } from '../org/ExecutionFooter';
import ExerciseExecutionCard from '../org/ExerciseExecutionCard';

const initialExerciseExecutionList: {exercise: Exercise, checked: boolean}[] = []

const ExecuteTrainingScreen = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  const {executionTrainingId, executionExerciseList} = useSelector((state: IState) => state.execution);
  
  const {training, exerciseList} = useSelector((state: IState) => {
    return {
      training: executionTrainingId !== null && state.global.trainingList !== null ?
        state.global.trainingList.find((training) => training.id === executionTrainingId) ?? null
        : null,
      exerciseList: executionTrainingId !== null && state.global.exerciseList !== null ?
        state.global.exerciseList.filter((exercise) => exercise.trainingId === executionTrainingId)
        : [] as Exercise[]
    }
  });

  useEffect(() => {
    if(executionTrainingId !== null)
      if(training !== null){
        const executionList = exerciseList.map((exercise) => { return {exerciseId: exercise.id, done: false}});
        executionList && dispatch(actionBuilders.execution.SET_EXERCISE_EXECUTION_LIST({executionList}));
      } else {
        dispatch(actionBuilders.execution.FINISH_TRAINING());
      }
  },
  [executionTrainingId]);

  if(executionTrainingId !== null && training !== null){
    const {name, details} = training;
    return(
      <View>
        <TrainingHeader
          id={executionTrainingId}
          name={name}
          details={details}
        />
        <View>
          {exerciseList.map((exercise, index) => {
            const execution = executionExerciseList.find((execution) => execution.exerciseId === exercise.id);
            const done = execution?.done ?? false;
            return(
              <View key={index}>
                <ExerciseExecutionCard
                  exercise={exercise}
                  checked={done}
                  onToggle={() => {
                    dispatch(actionBuilders.execution.TOGGLE_EXERCISE_DONE({exerciseId: exercise.id}));
                  }}
                />
              </View>
            );
          })}
        </View>
        <ExecutionFooter
          navigation={navigation}
        />
      </View>
    )
  } else {
    return(
      <View>
        <Text> Selecione um treino para começar </Text>
      </View>
    )
  };
}

export default ExecuteTrainingScreen;
