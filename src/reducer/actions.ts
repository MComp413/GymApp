import { types } from "@babel/core";
import { Action } from "redux";
import { Exercise, Training } from "../constants/types";

export interface IAction {
  type: string,
  payload: any
}

function emptyActionFactory(type: string){
  return () => {
    return { type } as Action<string>;
  }
}

function actionFactory<payloadType>(type: string){
  return (payload: payloadType) => {
    return { type, payload } as (Action<string> & { payload: payloadType });
  }
}

export const actionTypes = Object.freeze({
  global: Object.freeze({
    SET_TRAINING_LIST: "SET_TRAINING_LIST",
    SET_EXERCISE_LIST: "SET_EXERCISE_LIST"
  }),
  execution : Object.freeze({
    START_TRAINING: "START_TRAINING",
    SET_EXERCISE_EXECUTION_LIST: "SET_EXERCISE_EXECUTION_LIST",
    MARK_EXERCISE_DONE: "MARK_EXERCISE_DONE",
    MARK_EXERCISE_NOT_DONE: "MARK_EXERCISE_NOT_DONE",
    FINISH_TRAINING: "FINISH_TRAINING"
  }),
  newTraining: Object.freeze({
    SET_TRAINING_NAME: "SET_NEW_TRAINING_NAME",
    SET_TRAINING_DETAILS: "SET_NEW_TRAINING_DETAILS",
    CREATE_EXERCISE: "CREATE_NEW_EXERCISE",
    SET_EXERCISE_NAME: "SET_NEW_EXERCISE_NAME",
    SET_EXERCISE_DETAILS: "SET_NEW_EXERCISE_DETAILS",
    DELETE_EXERCISE: "DELETE_NEW_EXERCISE",
    FLUSH_FORM: "FLUSH_NEW_FORM"
  }),
  editTraining: Object.freeze({
    SET_EDITING_TRAINING: "SET_EDITING_TRAINING",
    SET_TRAINING_NAME: "SET_EDITING_TRAINING_NAME",
    SET_TRAINING_DETAILS: "SET_EDITING_TRAINING_DETAILS",
    CREATE_EXERCISE: "CREATE_EDITING_EXERCISE",
    SET_EXERCISE_NAME: "SET_EDITING_EXERCISE_NAME",
    SET_EXERCISE_DETAILS: "SET_EDITING_EXERCISE_DETAILS",
    DELETE_EXERCISE: "DELETE_EDITING_EXERCISE",
    FLUSH_FORM: "FLUSH_EDITING_FORM"
  })
});

export const actionBuilders = Object.freeze({
  global: Object.freeze({
    SET_TRAINING_LIST: actionFactory<{trainings: Training[]}>(actionTypes.global.SET_TRAINING_LIST),
    SET_EXERCISE_LIST: actionFactory<{exercises: Exercise[]}>(actionTypes.global.SET_EXERCISE_LIST)
  }),
  execution: Object.freeze({
    START_TRAINING: actionFactory<{trainingId: number}>(actionTypes.execution.START_TRAINING),
    SET_EXERCISE_EXECUTION_LIST: actionFactory<{executionList: {exerciseId: number, done: boolean}[]}>(actionTypes.execution.SET_EXERCISE_EXECUTION_LIST),
    MARK_EXERCISE_DONE: actionFactory<{exerciseId: number}>(actionTypes.execution.MARK_EXERCISE_DONE),
    MARK_EXERCISE_NOT_DONE: actionFactory<{exerciseId: number}>(actionTypes.execution.MARK_EXERCISE_NOT_DONE),
    FINISH_TRAINING: emptyActionFactory(actionTypes.execution.FINISH_TRAINING)
  }),
  newTraining: Object.freeze({
    SET_TRAINING_NAME: actionFactory<{name: string}>(actionTypes.newTraining.SET_TRAINING_NAME),
    SET_TRAINING_DETAILS: actionFactory<{details: string}>(actionTypes.newTraining.SET_TRAINING_DETAILS),
    CREATE_EXERCISE: emptyActionFactory(actionTypes.newTraining.CREATE_EXERCISE),
    SET_EXERCISE_NAME: actionFactory<{exerciseTempId: number, name: string}>(actionTypes.newTraining.SET_EXERCISE_NAME),
    SET_EXERCISE_DETAILS: actionFactory<{exerciseTempId: number, details: string}>(actionTypes.newTraining.SET_EXERCISE_DETAILS),
    DELETE_EXERCISE: actionFactory<{exerciseTempId: number}>(actionTypes.newTraining.DELETE_EXERCISE),
    FLUSH_FORM: emptyActionFactory(actionTypes.newTraining.FLUSH_FORM)
  }),
  editTraining: Object.freeze({
    SET_EDITING_TRAINING: actionFactory<{trainingId: number}>(actionTypes.editTraining.SET_EDITING_TRAINING),
    SET_TRAINING_NAME: actionFactory<{name: string}>(actionTypes.editTraining.SET_TRAINING_NAME),
    SET_TRAINING_DETAILS: actionFactory<{details: string}>(actionTypes.editTraining.SET_TRAINING_DETAILS),
    CREATE_EXERCISE: actionFactory<{trainingId: number}>(actionTypes.editTraining.CREATE_EXERCISE),
    SET_EXERCISE_NAME: actionFactory<{exerciseId: number, name: string}>(actionTypes.editTraining.SET_EXERCISE_NAME),
    SET_EXERCISE_DETAILS: actionFactory<{exerciseId: number, details: string}>(actionTypes.editTraining.SET_EXERCISE_DETAILS),
    DELETE_EXERCISE: actionFactory<{exerciseId: number}>(actionTypes.editTraining.DELETE_EXERCISE),
    FLUSH_FORM: emptyActionFactory(actionTypes.editTraining.FLUSH_FORM)
  })
})