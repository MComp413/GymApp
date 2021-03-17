import { createStore, Action, combineReducers } from 'redux';
import { IEditState, IExecutionState, IGlobalState, INewState, initialState, IState } from './state';
import { actionTypes, IAction } from './actions';
import { clone } from 'ramda';
import { NO_ID } from '../constants/constants';

function globalReducer(oldState: IGlobalState, action: IAction): IGlobalState {
  const newState = oldState ? {...oldState} : clone(initialState.global);
  switch(action.type){
    case actionTypes.global.SET_TRAINING_LIST:
      newState.trainingList = action.payload.trainings;
      break;
    case actionTypes.global.SET_EXERCISE_LIST:
      newState.exerciseList = action.payload.exercises;
      break;
  }
  return newState;
}

function executionReducer(oldState: IExecutionState, action: IAction): IExecutionState {
  const newState = oldState ? {...oldState} : clone(initialState.execution);
  switch(action.type){
    case actionTypes.execution.START_TRAINING:
      newState.executionTrainingId = action.payload.trainingId;
      break;
    case actionTypes.execution.SET_EXERCISE_EXECUTION_LIST:
      newState.executionExerciseList = action.payload.executionList;
      break;
    case actionTypes.execution.MARK_EXERCISE_DONE:
      newState.executionExerciseList = newState.executionExerciseList.map(
        (exercise) => exercise.exerciseId === action.payload.exerciseId ?
          { exerciseId: exercise.exerciseId, done: true } :
          exercise
      );
      break;
    case actionTypes.execution.MARK_EXERCISE_NOT_DONE:
      newState.executionExerciseList = newState.executionExerciseList.map(
        (exercise) => exercise.exerciseId === action.payload.exerciseId ?
          { exerciseId: exercise.exerciseId, done: false } :
          exercise
      );
      break;
    case actionTypes.execution.FINISH_TRAINING:
      return clone(initialState.execution)
  }
  return newState;
}

function newReducer(oldState: INewState, action: IAction): INewState {
  const newState = oldState ? {...oldState} : clone(initialState.newTraining);
  switch(action.type){
    case actionTypes.newTraining.SET_TRAINING_NAME:
      newState.name = action.payload.name;
      break;
    case actionTypes.newTraining.SET_TRAINING_DETAILS:
      newState.details = action.payload.details;
      break;
    case actionTypes.newTraining.SET_EXERCISE_NAME:
      newState.exercises = newState.exercises.map(
        (exercise) => exercise.id! === action.payload.exerciseTempId ?
          { ...exercise, name: action.payload.name } :
          exercise
      );
      break;
    case actionTypes.newTraining.SET_EXERCISE_DETAILS:
      newState.exercises = newState.exercises.map(
        (exercise) => exercise.id! === action.payload.exerciseTempId ?
          { ...exercise, details: action.payload.details } :
          exercise
      );
      break;
    case actionTypes.newTraining.CREATE_EXERCISE:
      const exerciseListLength = newState.exercises.length;
      const maxTmpId = exerciseListLength > 0 ? newState.exercises[exerciseListLength-1].id! : 0;
      newState.exercises = [...newState.exercises, {id: maxTmpId+1, name: "", details: "", trainingId: NO_ID}];
      break;
    case actionTypes.newTraining.DELETE_EXERCISE:
      newState.exercises = newState.exercises.filter((exercise) => exercise.id !== action.payload.exerciseTempId);
      break;
    case actionTypes.newTraining.FLUSH_FORM:
      return clone(initialState.newTraining);
  }
  return newState;
}

function editReducer(oldState: IEditState, action: IAction): IEditState {
  const newState = oldState ? {...oldState} : clone(initialState.editTraining);
  switch(action.type){
    case actionTypes.editTraining.SET_TRAINING_NAME:
      newState.name = action.payload.name;
      break;
    case actionTypes.editTraining.SET_TRAINING_DETAILS:
      newState.details = action.payload.details;
      break;
    case actionTypes.editTraining.SET_EXERCISE_NAME:
      newState.exercises = newState.exercises.map(
        (exercise) => exercise.id! === action.payload.exerciseId ?
          { ...exercise, name: action.payload.name } :
          exercise
      );
      break;
    case actionTypes.editTraining.SET_EXERCISE_DETAILS:
      newState.exercises = newState.exercises.map(
        (exercise) => exercise.id! === action.payload.exerciseId ?
          { ...exercise, details: action.payload.details } :
          exercise
      );
      break;
    case actionTypes.editTraining.CREATE_EXERCISE:
      const exerciseListLength = newState.exercises.length;
      const maxTmpId = exerciseListLength > 0 ? newState.exercises[exerciseListLength-1].id! : 1;
      newState.exercises = [...newState.exercises, {id: maxTmpId+1, name: "", details: "", trainingId: action.payload.trainingId}];
      break;
    case actionTypes.editTraining.DELETE_EXERCISE:
      newState.exercises = newState.exercises.filter((exercise) => exercise.id !== action.payload.exerciseTempId);
      break;
    case actionTypes.editTraining.FLUSH_FORM:
      return clone(initialState.editTraining);
  }
  return newState;
}

export const rootReducer = combineReducers({global: globalReducer, execution: executionReducer, newTraining: newReducer, editTraining: editReducer});

export const store = createStore(rootReducer);