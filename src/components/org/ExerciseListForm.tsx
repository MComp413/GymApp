import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Exercise } from '../../constants/types';
import { InputStyles } from '../../styles/styles';

const ExerciseListForm = (
  props: {
    exercises: Exercise[],
    onChangeNameCurry: (exerciseId: number) => (text: string) => void,
    onChangeDetailCurry: (exerciseId: number) => (text: string) => void
    onDeleteCurry: (exerciseId: number) => () => void,
    onAddExercise: () => void
  }
) => {
  const {
    exercises,
    onChangeDetailCurry,
    onChangeNameCurry,
    onDeleteCurry,
    onAddExercise
  } = props;
  return(
    <ScrollView>
      {exercises.map((exercise, index) => 
        <View key={index}>
          <Text> Nome do exercício </Text>
          <TextInput
            style={InputStyles.textInput}
            onChangeText={onChangeNameCurry(exercise.id)}
            value={exercise.name}
          />

          <Text> Detalhes do exercício </Text>
          <TextInput
            style={InputStyles.textInput}
            onChangeText={onChangeDetailCurry(exercise.id)}
            value={exercise.details}
          />

          <Button
            title="Deletar exercicio"
            onPress={onDeleteCurry(exercise.id)}
          />
        </View>
      )}
      <Button
        title="Adicionar exercício"
        onPress={onAddExercise}
      />
    </ScrollView>
  )
}

export default ExerciseListForm;