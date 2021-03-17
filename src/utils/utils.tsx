import { range } from "ramda";
import { Dispatch } from "redux";
import { Exercise, Training } from "../constants/types";
import { exerciseCrud, trainingCrud } from "../database/transactions";
import { actionBuilders } from "../reducer/actions";

export function updateGlobalTrainingList(dispatch: Dispatch){
  trainingCrud.read.all((rows, tx) => {
    const trainings: Training[] = range(0, rows.length).map((itemIndex) => rows.item(itemIndex));
    dispatch(actionBuilders.global.SET_TRAINING_LIST({trainings}));
  });
}

export function updateGlobalExerciseList(dispatch: Dispatch){
  exerciseCrud.read.all((rows, tx) => {
    const exercises: Exercise[] = range(0, rows.length).map((itemIndex) => rows.item(itemIndex));
    console.log(exercises);
    dispatch(actionBuilders.global.SET_EXERCISE_LIST({exercises}));
  });
}