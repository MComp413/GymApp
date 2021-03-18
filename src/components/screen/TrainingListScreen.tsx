import React, { useEffect } from 'react';
import { Button, View, StyleSheet, FlatList, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavRoutes, StackNavTitles } from '../../constants/constants';
import TrainingCard from '../org/TrainingCard';
import { IState } from '../../reducer/state';
import { updateGlobalExerciseList, updateGlobalTrainingList } from '../../utils/utils';

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
    if(trainingList === null)
      updateGlobalTrainingList(dispatch);

    if(exerciseList === null)
      updateGlobalExerciseList(dispatch);
  },
  [trainingList, exerciseList]);

  return(
    <View style={styles.screen}>
      {trainingList !== null && exerciseList !== null &&
       trainingList.length > 0 && exerciseList.length > 0 ?
        <FlatList
          data={trainingList}
          renderItem={(info) => 
            <View key={info.index}>
              <TrainingCard
                training={info.item}
                navigation={navigation}
              />
            </View>
          }
        />
      :
        <Text style={{textAlign: 'center'}}> Crie um treino para começar </Text>
      }
      <Button
        title={StackNavTitles[StackNavRoutes.NEW]}
        onPress={() => navigation.navigate(StackNavRoutes.NEW)}
      />
    </View>
  );
}

export default TrainingListScreen;
