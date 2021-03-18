import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Exercise } from '../../constants/types';
import { actionBuilders } from '../../reducer/actions';

const style = StyleSheet.create({
  textInput: {
    padding: 5,
    backgroundColor: "white"
  }
})

const ExerciseListForm = (
  props: {
    exercises: Exercise[],
    onChangeNameCurry: (exerciseId: number) => (text: string) => void,
    onChangeDetailCurry: (exerciseId: number) => (text: string) => void
    onDeleteCurry: (exerciseId: number) => () => void
  }
) => {
  const {
    exercises,
    onChangeDetailCurry,
    onChangeNameCurry,
    onDeleteCurry
  } = props;
  return(
    <View>
      {exercises.map((exercise, index) => 
        <View key={index}>
          <Text> Nome do exercício </Text>
          <TextInput
            style={style.textInput}
            onChangeText={onChangeNameCurry(exercise.id)}
            value={exercise.name}
          />

          <Text> Detalhes do exercício </Text>
          <TextInput
            style={style.textInput}
            onChangeText={onChangeDetailCurry(exercise.id)}
            value={exercise.details}
          />

          <Button
            title="Deletar exercicio"
            onPress={onDeleteCurry(exercise.id)}
          />
        </View>
      )}
    </View>
  )
}

export default ExerciseListForm;