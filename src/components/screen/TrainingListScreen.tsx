import React, { useEffect } from 'react';
import { Button, View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavRoutes, StackNavTitles } from '../../constants/constants';
import { actionBuilders } from '../../reducer/actions';
import TrainingCard from '../org/TrainingCard';
import { IState } from '../../reducer/state';
import { mock } from '../../../res/mockdata';
import { exerciseCrud, trainingCrud } from '../../database/transactions';
import { range } from 'ramda';
import { Exercise, Training } from '../../constants/types';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch",
  }
});

const TrainingListScreen = ({route, navigation}: any) => {
  const {trainingList, exerciseList} = useSelector((state: IState) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    if(trainingList.length === 0){
      trainingCrud.read.all((rows) => {
        const trainings: Training[] = range(0, rows.length).map((itemIndex) => rows.item(itemIndex));
        dispatch(actionBuilders.global.SET_TRAINING_LIST({trainings}));
      });
    }

    if(exerciseList.length === 0){
      exerciseCrud.read.all((rows) => {
        const exercises: Exercise[] = range(0, rows.length).map((itemIndex) => rows.item(itemIndex));
        dispatch(actionBuilders.global.SET_EXERCISE_LIST({exercises}));
      });
    }
  },
  [trainingList, exerciseList]);

  return(
    <View style={styles.screen}>
        {trainingList.map((training, index) =>
          <View key={index}>
            <TrainingCard
              training={training}
              navigation={navigation}
            />
          </View>
        )}
        
        <Button
            title={StackNavTitles[StackNavRoutes.NEW]}
            onPress={() => navigation.navigate(StackNavRoutes.NEW)}
        />
    </View>
  );
}

export default TrainingListScreen;
