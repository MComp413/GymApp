import React, { useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { StackNavRoutes } from '../../constants/constants';
import { Exercise } from '../../constants/types';
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

const EditTrainingScreen = ({route, navigation}: any) => {
  const currentData = useSelector((state: IState) => state.editTraining);
  const {editingTrainingId, name, details, exercises} = currentData;
  const dispatch = useDispatch();
  
  return(
    <View>
      {editingTrainingId !== null ? 
        <>
          <Text> Nome do treino: </Text>
          <TextInput
            style={style.textInput}
            onChangeText={(text) => dispatch(actionBuilders.editTraining.SET_TRAINING_NAME({name: text}))}
            value={name}
          />

          <Text> Detalhes do treino: </Text>
          <TextInput
            style={style.textInput}
            onChangeText={(text) => dispatch(actionBuilders.editTraining.SET_TRAINING_DETAILS({details: text}))}
            value={details}
          />

          <ExerciseListForm
            exercises={exercises.filter((exercise) => exercise.status !== "deleted")}
            onChangeNameCurry={(exerciseId) => (text) => dispatch(actionBuilders.editTraining.SET_EXERCISE_NAME({exerciseId, name: text}))}
            onChangeDetailCurry={(exerciseId) => (text) => dispatch(actionBuilders.editTraining.SET_EXERCISE_DETAILS({exerciseId, details: text}))}
            onDeleteCurry={(exerciseId) => () => dispatch(actionBuilders.editTraining.DELETE_EXERCISE({exerciseId}))}
          />

          <Button
            title="Adicionar exercício"
            onPress={() => dispatch(actionBuilders.editTraining.CREATE_EXERCISE({trainingId: editingTrainingId}))}
          />

          <Button
            title="Save"
            onPress={() => {
              trainingCrud.updateWithExercises({id: editingTrainingId, name, details}, exercises, (rows, tx) => {
                console.log("Executing callback");
                updateGlobalTrainingList(dispatch);
                updateGlobalExerciseList(dispatch);
                dispatch(actionBuilders.editTraining.FLUSH_FORM());
                navigation.navigate(StackNavRoutes.HOME);
              });
            }}
          />
        </>
      :
        <Text> Selecione um treino para editar </Text>
      }
    </View>
  );
}

export default EditTrainingScreen;
