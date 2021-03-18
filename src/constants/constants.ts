export const StackNavRoutes = Object.freeze({
  HOME: "HOME",
  NEW: "NEW",
  EDIT: "EDIT"
})

export const StackNavTitles = Object.freeze({
  [StackNavRoutes.HOME]: "COMP ACADEMIA",
  [StackNavRoutes.NEW]: "NOVO TREINO",
  [StackNavRoutes.EDIT]: "EDITAR TREINO"
})

export const TabNavRoutes = Object.freeze({
  LIST: "LIST",
  STATS: "STATS",
  EXECUTE: "EXECUTE"
})

export const TabNavTitles = Object.freeze({
  [TabNavRoutes.LIST]: "SEUS TREINOS",
  [TabNavRoutes.STATS]: "SEU PROGRESSO",
  [TabNavRoutes.EXECUTE]: "TREINAR"
})

export const tableNames = Object.freeze({
  TRAINING: "tTraining",
  EXERCISES: "tExercises"
})

export const tableSchemas = Object.freeze({
  TRAINING: `${tableNames.TRAINING} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, details TEXT)`,
  EXERCISES: `${tableNames.EXERCISES} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, details TEXT, trainingId INTEGER, FOREIGN KEY(trainingId) REFERENCES ${tableNames.TRAINING}(id))`
})

export const tableValues = Object.freeze({
  TRAINING: `(name, details)`,
  EXERCISES: `(name, details, trainingId)`
})

export const spacingSizes = Object.freeze({
  tiny: 2,
  small: 5,
  medium: 10,
  large: 30,
  extraLarge: 50 
})

export const NO_ID = -1;