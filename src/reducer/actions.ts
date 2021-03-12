import { Exercise, Training } from "../constants/types";

export const actionTypes = Object.freeze({
  trainingList: Object.freeze({
    SET_TRAINING_LIST: "SET_TRAINING_LIST"
  }),
  execution : Object.freeze({
    START_TRAINING: "START_TRAINING",
    MARK_EXERCISE_DONE: "MARK_EXERCISE_DONE",
    MARK_EXERCISE_NOT_DONE: "MARK_EXERCISE_NOT_DONE",
    FINISH_TRAINING: "FINISH_TRAINING"
  }),
  newTraining: Object.freeze({
    SET_TRAINING_NAME: "SET_TRAINING_NAME",
    SET_TRAINING_DETAILS: "SET_TRAINING_DETAILS",
    CREATE_EXERCISE: "CREATE_EXERCISE",
    SET_EXERCISE_NAME: "SET_EXERCISE_NAME",
    SET_EXERCISE_DETAIL: "SET_EXERCISE_DETAIL",
    DELETE_EXERCISE: "DELETE_EXERCISE",
    FLUSH_FORM: "FLUSH_FORM"
  }),
  editTraining: Object.freeze({
    SET_EDITING_TRAINING: "SET_EDITING_TRAINING",
    SET_TRAINING_NAME: "SET_TRAINING_NAME",
    SET_TRAINING_DETAILS: "SET_TRAINING_DETAILS",
    CREATE_EXERCISE: "CREATE_EXERCISE",
    SET_EXERCISE_NAME: "SET_EXERCISE_NAME",
    SET_EXERCISE_DETAIL: "SET_EXERCISE_DETAIL",
    DELETE_EXERCISE: "DELETE_EXERCISE",
    FLUSH_FORM: "FLUSH_FORM"
  })
});

const actionBuilders = Object.freeze({
  trainingList: Object.freeze({
    SET_TRAINING_LIST: actionFactory<{trainings: Training[], exercises: Exercise[]}>(actionTypes.trainingList.SET_TRAINING_LIST)
  }),
  execution: Object.freeze({
    START_TRAINING: actionFactory<{trainingId: number}>(actionTypes.execution.START_TRAINING),
    MARK_EXERCISE_DONE: actionFactory<{exerciseId: number}>(actionTypes.execution.MARK_EXERCISE_DONE),
    MARK_EXERCISE_NOT_DONE: actionFactory<{exerciseId: number}>(actionTypes.execution.MARK_EXERCISE_NOT_DONE),
    FINISH_TRAINING: actionFactory<undefined>(actionTypes.execution.FINISH_TRAINING)
  }),
  newTraining: Object.freeze({
    SET_TRAINING_NAME: actionFactory<{name: string}>(actionTypes.newTraining.SET_TRAINING_NAME),
    SET_TRAINING_DETAILS: actionFactory<{details: string}>(actionTypes.newTraining.SET_TRAINING_DETAILS),
    CREATE_EXERCISE: actionFactory<undefined>(actionTypes.newTraining.CREATE_EXERCISE),
    SET_EXERCISE_NAME: actionFactory<{exerciseTempId: number, name: string}>(actionTypes.newTraining.SET_EXERCISE_NAME),
    SET_EXERCISE_DETAIL: actionFactory<{exerciseTempId: number, details: string}>(actionTypes.newTraining.SET_EXERCISE_DETAIL),
    DELETE_EXERCISE: actionFactory<{exerciseTempId: number}>(actionTypes.newTraining.DELETE_EXERCISE),
    FLUSH_FORM: actionFactory<undefined>(actionTypes.newTraining.FLUSH_FORM)
  }),
  editTraining: Object.freeze({
    SET_EDITING_TRAINING: actionFactory<{trainingId: number}>(actionTypes.editTraining.SET_EDITING_TRAINING),
    SET_TRAINING_NAME: actionFactory<{name: string}>(actionTypes.editTraining.SET_TRAINING_NAME),
    SET_TRAINING_DETAILS: actionFactory<{details: string}>(actionTypes.editTraining.SET_TRAINING_DETAILS),
    CREATE_EXERCISE: actionFactory<undefined>(actionTypes.editTraining.CREATE_EXERCISE),
    SET_EXERCISE_NAME: actionFactory<{exerciseId: number, name: string}>(actionTypes.editTraining.SET_EXERCISE_NAME),
    SET_EXERCISE_DETAIL: actionFactory<{exerciseId: number, details: string}>(actionTypes.editTraining.SET_EXERCISE_DETAIL),
    DELETE_EXERCISE: actionFactory<{exerciseId: number}>(actionTypes.editTraining.DELETE_EXERCISE),
    FLUSH_FORM: actionFactory<undefined>(actionTypes.editTraining.FLUSH_FORM)
  })
})

function actionFactory<payloadType>(type: string){
  return (payload: payloadType) => {
    return { type, payload };
  }
}