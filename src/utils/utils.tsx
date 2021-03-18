import { range } from "ramda";
import { Dispatch } from "redux";
import { Exercise, Training } from "../constants/types";
import { exerciseCrud, trainingCrud } from "../database/transactions";
import { actionBuilders } from "../reducer/actions";

export function updateGlobalTrainingList(dispatch: Dispatch){
  trainingCrud.read.all((result, tx) => {
    const trainings: Training[] = range(0, result.rows.length).map((itemIndex) => result.rows.item(itemIndex));
    dispatch(actionBuilders.global.SET_TRAINING_LIST({trainings}));
  });
}

export function updateGlobalExerciseList(dispatch: Dispatch){
  exerciseCrud.read.all((result, tx) => {
    const exercises: Exercise[] = range(0, result.rows.length).map((itemIndex) => result.rows.item(itemIndex));
    console.log(exercises);
    dispatch(actionBuilders.global.SET_EXERCISE_LIST({exercises}));
  });
}