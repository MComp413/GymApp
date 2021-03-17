import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { NO_ID, StackNavRoutes } from '../../constants/constants';
import { trainingCrud } from '../../database/transactions';
import { actionBuilders } from '../../reducer/actions';
import { IState } from '../../reducer/state';
import { updateGlobalExerciseList, updateGlobalTrainingList } from '../../utils/utils';

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
    <View>
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

      <Text> TODO: lista de exercícios </Text>

      {exercises.map((exercise, index) => 
        <View key={index}>
          <Text> Nome do exercício </Text>
          <TextInput
            style={style.textInput}
            onChangeText={(text) => dispatch(actionBuilders.newTraining.SET_EXERCISE_NAME({exerciseTempId: exercise.id, name: text}))}
            value={exercise.name}
          />

          <Text> Detalhes do exercício </Text>
          <TextInput
            style={style.textInput}
            onChangeText={(text) => dispatch(actionBuilders.newTraining.SET_EXERCISE_DETAILS({exerciseTempId: exercise.id, details: text}))}
            value={exercise.details}
          />

          <Button
            title="Deletar exercicio"
            onPress={() => dispatch(actionBuilders.newTraining.DELETE_EXERCISE({exerciseTempId: exercise.id}))}
          />
        </View>
      )}

      <Button
        title="Adicionar exercício"
        onPress={() => dispatch(actionBuilders.newTraining.CREATE_EXERCISE())}
      />

      <Button
        title="Create"
        onPress={() => {
          trainingCrud.createWithExercises({id: NO_ID, name, details}, exercises);
          updateGlobalTrainingList(dispatch);
          updateGlobalExerciseList(dispatch);
          dispatch(actionBuilders.newTraining.FLUSH_FORM());
          navigation.navigate(StackNavRoutes.HOME);
        }}
      />
    </View>
  );
}

export default NewTrainingScreen;
