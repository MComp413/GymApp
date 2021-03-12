import { Exercise, Training } from "../constants/types";

export interface State {
  global: {
    trainingList: Training[],
    exerciseList: Exercise[]
  },
  execution: {
    executionTrainingId: number | null,
    executionExerciseList: {exerciseId: number, done: boolean}[]
  },
  editTraining: {
    editingTrainingId: number | null,
    name: string,
    details: string,
    exercises: Exercise[]
  },
  newTraining:{
    name: string,
    details: string,
    exercises: Exercise[]
  }
}

export const initialState: State = Object.freeze({
  global: Object.freeze({
    trainingList: [],
    exerciseList: []
  }),
  execution: Object.freeze({
    executionTrainingId: null,
    executionExerciseList: []
  }),
  editTraining: Object.freeze({
    editingTrainingId: null,
    name: "",
    details: "",
    exercises: []
  }),
  newTraining: Object.freeze({
    name: "",
    details: "",
    exercises: []
  })
});