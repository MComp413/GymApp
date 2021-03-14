import { Exercise, Training } from "../constants/types";

export interface IGlobalState {
  trainingList: Training[],
  exerciseList: Exercise[]
}

export interface IExecutionState {
  executionTrainingId: number | null,
  executionExerciseList: {exerciseId: number, done: boolean}[]
}

export interface IEditState {
  editingTrainingId: number | null,
  name: string,
  details: string,
  exercises: Exercise[]
}

export interface INewState {
  name: string,
  details: string,
  exercises: Exercise[]
}

export interface IState {
  global: IGlobalState,
  execution: IExecutionState,
  editTraining: IEditState,
  newTraining: INewState
}

export const initialState: IState = Object.freeze({
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