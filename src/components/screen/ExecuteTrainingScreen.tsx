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
      training: executionTrainingId !== null ? state.global.trainingList.find((training) => training.id === executionTrainingId) : null,
      exerciseList: executionTrainingId !== null ? state.global.exerciseList.filter((exercise) => exercise.trainingId === executionTrainingId) : [] as Exercise[]
    }
  });

  useEffect(() => {
    if(executionTrainingId !== null && executionTrainingId !== undefined){
      if(training === null){
        dispatch(actionBuilders.execution.FINISH_TRAINING());
      } else {
        const executionList = exerciseList.map((exercise) => {
          return {
            exerciseId: exercise.id,
            done: false
          }
        });
        dispatch(actionBuilders.execution.SET_EXERCISE_EXECUTION_LIST({executionList}));
      }
    }
  },
  [executionTrainingId]);

  if(executionTrainingId !== null && executionTrainingId !== undefined && training !== null && training !== undefined){
    const {name, details} = training;
    return(
      <View>
        <TrainingHeader
          id={executionTrainingId}
          name={name}
          details={details}
        />
        <View>
          {exerciseList!.map((exercise, index) => {
            const execution = executionExerciseList.find((execution) => execution.exerciseId === exercise.id);
            const done = execution ? execution.done : false;
            return(
              <View key={index}>
                <ExerciseExecutionCard
                  exercise={exercise}
                  checked={done}
                  onToggle={() => {
                    if(done){
                      dispatch(actionBuilders.execution.MARK_EXERCISE_NOT_DONE({exerciseId: exercise.id}));
                    } else {
                      dispatch(actionBuilders.execution.MARK_EXERCISE_DONE({exerciseId: exercise.id}));
                    }
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
