import React, { useEffect } from 'react';
import { Button, View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavRoutes, StackNavTitles } from '../../constants/constants';
import { actionBuilders } from '../../reducer/actions';
import TrainingCard from '../org/TrainingCard';
import { IState } from '../../reducer/state';
import { mock } from '../../../res/mockdata';

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
      dispatch(actionBuilders.global.SET_TRAINING_LIST({trainings: mock.trainingList}));
    }
    if(exerciseList.length === 0){
      dispatch(actionBuilders.global.SET_EXERCISE_LIST({exercises: mock.exerciseList}));
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
