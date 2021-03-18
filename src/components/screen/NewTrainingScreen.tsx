import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NO_ID, StackNavRoutes } from '../../constants/constants';
import { trainingCrud } from '../../database/transactions';
import { actionBuilders } from '../../reducer/actions';
import { IState } from '../../reducer/state';
import { updateGlobalExerciseList, updateGlobalTrainingList } from '../../utils/utils';
import ExerciseListForm from '../org/ExerciseListForm';

const style = StyleSheet.create({
  textInput: {
    padding: 5,
    backgroundColor: "white"
  }
})

const NewTrainingScreen = ({route, navigation}: any) => {
  const {name, details, exercises} = useSelector((state: IState) => state.newTraining);
  const dispatch = useDispatch();
  return(
    <View
      style={{flex: 1, flexDirection: 'column', justifyContent: "center", alignItems: "stretch"}}
    >
      <Text> Nome do treino: </Text>
      <TextInput
        style={style.textInput}
        onChangeText={(text) => dispatch(actionBuilders.newTraining.SET_TRAINING_NAME({name: text}))}
        value={name}
      />

      <Text> Detalhes do treino: </Text>
      <TextInput
        style={style.textInput}
        onChangeText={(text) => dispatch(actionBuilders.newTraining.SET_TRAINING_DETAILS({details: text}))}
        value={details}
      />

      <ExerciseListForm
        exercises={exercises}
        onChangeNameCurry={(exerciseId) => (text) => dispatch(actionBuilders.newTraining.SET_EXERCISE_NAME({exerciseTempId: exerciseId, name: text}))}
        onChangeDetailCurry={(exerciseId) => (text) => dispatch(actionBuilders.newTraining.SET_EXERCISE_DETAILS({exerciseTempId: exerciseId, details: text}))}
        onDeleteCurry={(exerciseId) => () => dispatch(actionBuilders.newTraining.DELETE_EXERCISE({exerciseTempId: exerciseId}))}
        onAddExercise={() => dispatch(actionBuilders.newTraining.CREATE_EXERCISE())}
      />

      <Button
        title="Create"
        onPress={() => {
          trainingCrud.createWithExercises({id: NO_ID, name, details}, exercises, (rows, tx) => {
            console.log("Executing callback");
            updateGlobalTrainingList(dispatch);
            updateGlobalExerciseList(dispatch);
            dispatch(actionBuilders.newTraining.FLUSH_FORM());
            navigation.navigate(StackNavRoutes.HOME);
          });
        }}
      />
    </View>
  );
}

export default NewTrainingScreen;
