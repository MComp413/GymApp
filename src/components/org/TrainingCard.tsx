import React from 'react';
import { Button, View } from 'react-native';
import { Exercise, Training } from '../../constants/types';
import TrainingData from '../mol/TrainingData';
import { StackNavRoutes, StackNavTitles, TabNavRoutes, TabNavTitles } from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { actionBuilders } from '../../reducer/actions';
import { IState } from '../../reducer/state';
import { trainingCrud } from '../../database/transactions';
import { updateGlobalExerciseList, updateGlobalTrainingList } from '../../utils/utils';
import { FlexStyles, PaddingStyles } from '../../styles/styles';
import Colors from '../../constants/colors';


const TrainingCard = (props: {training: Training, navigation: any}) => {
  const {training, navigation} = props;
  const {id, name, details} = training;
  const exerciseList = useSelector((state: IState) => state.global.exerciseList !== null ?
    state.global.exerciseList.filter((exercise) => exercise.trainingId === id)
    : [] as Exercise[]
  )
  const dispatch = useDispatch();
  
  return(
    <View
      style={FlexStyles.columnView}
    >
      <View
        style={{...FlexStyles.rowView, ...PaddingStyles.vertical.small}}
      >
        <TrainingData
          id={id}
          name={name}
          details={details}
          exerciseList={exerciseList}
        />
        <View>
          <Button
            title={StackNavTitles[StackNavRoutes.EDIT]}
            onPress={() => {
              dispatch(actionBuilders.editTraining.SET_EDITING_TRAINING({training, exerciseList: exerciseList}))
              navigation.push(StackNavRoutes.EDIT)
            }}
          />
          <Button
            color={Colors.primary}
            title="deletar treino"
            onPress={() => {
              console.log(`deletando ${id} - ${name}`);
              trainingCrud.deleteWithExercises(id);
              updateGlobalTrainingList(dispatch);
              updateGlobalExerciseList(dispatch);
            }}
          />
        </View>
      </View>
      <Button
        title={TabNavTitles[TabNavRoutes.EXECUTE]}
        onPress={() => {
          dispatch(actionBuilders.execution.START_TRAINING({trainingId: training.id}));
          navigation.navigate(TabNavRoutes.EXECUTE, {trainingId: id});
        }}
      />
    </View>
  )
}

export default TrainingCard;