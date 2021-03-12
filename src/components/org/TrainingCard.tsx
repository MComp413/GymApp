import React from 'react';
import { Button, View } from 'react-native';
import { Training } from '../../constants/types';
import TrainingData from '../mol/TrainingData';
import { mock } from '../../../res/mockdata';
import { StackNavRoutes, StackNavTitles } from '../../constants/constants';


const TrainingCard = (props: {id: number, navigation: any}) => {
  const training = mock.trainingList.find((training) => training.id == props.id);
  const {id, name, details} = training ? training : {id: 0, name: "not found", details: "not found"};
  const exerciseList = mock.exerciseList.filter((exercise) => exercise.trainingId === id);
  
  return(
    <View>
      <TrainingData
        id={id}
        name={name}
        details={details}
        exerciseList={exerciseList}
      />
      <View>
        <Button
          title={StackNavTitles[StackNavRoutes.EDIT]}
          onPress={() => props.navigation.push(StackNavRoutes.EDIT, {trainingId: id})}
        />
        <Button
          title="deletar treino"
          onPress={() => console.log(`deletah ${id} - ${name}`)}
        />
      </View>
    </View>
  )
}

export default TrainingCard;