import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Exercise } from '../../constants/types';
import { FlexStyles, InputStyles, PaddingStyles } from '../../styles/styles';
import InputLabel from '../atom/InputLabel';
import Button from '../atom/Button';

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
        <View
          style={{...PaddingStyles.vertical.small}}
          key={index}
        >
          <View
            style={{...PaddingStyles.vertical.small}}
          >
            <InputLabel text="Nome do exercício" />
            <TextInput
              style={InputStyles.textInput}
              onChangeText={onChangeNameCurry(exercise.id)}
              value={exercise.name}
            />

            <InputLabel text="Detalhes do exercício" />
            <TextInput
              style={InputStyles.textInput}
              onChangeText={onChangeDetailCurry(exercise.id)}
              value={exercise.details}
            />
          </View>

          <Button
            onPress={onDeleteCurry(exercise.id)}
          >
            <Text> Deletar exercício </Text>
          </Button>
        </View>
      )}
      <Button
        onPress={onAddExercise}
      >
        <Text> Adicionar exercício </Text>
      </Button>
    </ScrollView>
  )
}

export default ExerciseListForm;