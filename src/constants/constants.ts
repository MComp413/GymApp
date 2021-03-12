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
  EXERCISES: `${tableNames.EXERCISES} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, details TEXT, training INTEGER, FOREIGN KEY(training) REFERENCES ${tableNames.TRAINING}(id))`
})

export const tableValues = Object.freeze({
  TRAINING: `(name TEXT NOT NULL, details TEXT)`,
  EXERCISES: `(name TEXT NOT NULL, details TEXT, training INTEGER)`
})