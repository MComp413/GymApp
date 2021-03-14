import React from 'react';
import { Button, View } from 'react-native';
import { Training } from '../../constants/types';
import TrainingData from '../mol/TrainingData';
import { mock } from '../../../res/mockdata';
import { StackNavRoutes, StackNavTitles, TabNavRoutes, TabNavTitles } from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { actionBuilders } from '../../reducer/actions';
import { IState } from '../../reducer/state';


const TrainingCard = (props: {training: Training, navigation: any}) => {
  const {training, navigation} = props;
  const {id, name, details} = training;
  const exerciseList = useSelector((state: IState) => state.global.exerciseList.filter((exercise) => exercise.trainingId === id));
  const dispatch = useDispatch();
  
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
          onPress={() => navigation.push(StackNavRoutes.EDIT, {trainingId: id})}
        />
        <Button
          title="deletar treino"
          onPress={() => console.log(`deletah ${id} - ${name}`)}
        />
      </View>
      <Button
        title={TabNavTitles[TabNavRoutes.EXECUTE]}
        onPress={() => {
          dispatch(actionBuilders.execution.START_TRAINING({trainingId: training.id}));
          navigation.navigate(TabNavRoutes.EXECUTE, {trainingId: id})
        }}
      />
    </View>
  )
}

export default TrainingCard;