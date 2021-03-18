import { openDatabase, ResultSetRowList, SQLError, Transaction } from 'react-native-sqlite-storage';
import { Exercise, ExerciseEdition, Training, transactionCallback } from '../constants/types';
import { tableNames, tableSchemas, tableValues } from '../constants/constants';
import { mock } from '../../res/mockdata';
import { flatten } from 'ramda';


const db = openDatabase(
  { name: "gymapp8.db", location: "default" },
  () => {
    initTable();
  },
  () => console.log("DB connection failure!")
)

function initTable(){
  console.log("Initializing Tables")
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableSchemas.TRAINING};`,
      [],
      (tx, result) => console.log(`DB ${tableNames.TRAINING} initialization success!`),
      (tx, err) => console.log(`DB ${tableNames.TRAINING} initialization error: ${err}!`)
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableSchemas.EXERCISES};`,
      [],
      (tx, result) => console.log(`DB ${tableNames.EXERCISES} initialization success!`),
      (tx, err) => console.log(`DB ${tableNames.EXERCISES} initialization error: ${err}!`)
    );
    console.log("DB connection success!");
  });
  //writeMockData();
}

function writeMockData(){
  console.log("Writing mocked data to DB;");
  for(const trainingMock of mock.trainingList){
    console.log(`Creating: ${JSON.stringify(trainingMock)}`);
    trainingCrud.create(trainingMock, (rows) => {
      console.log(JSON.stringify(rows));
    });
  }
  for(const exerciseMock of mock.exerciseList){
    console.log(`Creating: ${JSON.stringify(exerciseMock)}`);
    exerciseCrud.create(exerciseMock);
  }
}

const logTxError = {
  create: (err: SQLError, tableName: string, data: any) => {
    console.error(`Error writing to ${tableName}: ${JSON.stringify(data)}`);
    console.error(`Error: ${JSON.stringify(err)}`)
  },
  read: (err: SQLError, tableName: string) => {
    console.error(`Error reading from table ${tableName}`);
    console.error(`Error: ${JSON.stringify(err)}`)
  },
  update: (err: SQLError, tableName: string, data: any) => {
    console.error(`Error updating ${tableName}: ${JSON.stringify(data)}`);
    console.error(`Error: ${JSON.stringify(err)}`)
  },
  delete: (err: SQLError, tableName: string, data: any) => {
    console.error(`Error deleting from table ${tableName}: ${JSON.stringify(data)}`);
    console.error(`Error: ${JSON.stringify(err)}`)
  }
}

export const trainingCrud = Object.freeze({
  create: (data: Training, cb?: transactionCallback) => db.transaction((tx) => tx.executeSql(
    `INSERT INTO ${tableNames.TRAINING} ${tableValues.TRAINING} VALUES (?, ?);`,
    [data.name, data.details],
    (tx, result) => cb && cb(result, tx),
    (tx, err) => logTxError.create(err, tableNames.TRAINING, data)
  )),
  createWithExercises: (training: Training, exerciseList: Exercise[], cb?: transactionCallback) => {
    const writeExercisesCallback: transactionCallback = (results, tx) => {
      if(exerciseList.length > 0){
        const trainingId = results.insertId;
        return tx.executeSql(
          `INSERT INTO ${tableNames.EXERCISES} ${tableValues.EXERCISES} VALUES ${exerciseList.map(() => `(?, ?, ?)`).join(", ")};`,
          flatten(exerciseList.map((exercise) => [exercise.name, exercise.details, trainingId])),
          (tx, results) => cb && cb(results, tx),
          (tx, err) => logTxError.create(err, tableNames.EXERCISES, {byTrainingId: trainingId})
        );
      }
      return cb && cb(results, tx);
    }
    
    return db.transaction((tx) => tx.executeSql(
      `INSERT INTO ${tableNames.TRAINING} ${tableValues.TRAINING} VALUES (?, ?);`,
      [training.name, training.details],
      (tx, result) => writeExercisesCallback(result, tx),
      (tx, err) => logTxError.create(err, tableNames.TRAINING, training)
    ));
  },
  read: Object.freeze({
    all: (cb: transactionCallback) => db.transaction((tx) => tx.executeSql(
      `SELECT * FROM ${tableNames.TRAINING};`,
      [],
      (tx, results) => cb(results, tx),
      (tx, err) => logTxError.read(err, tableNames.TRAINING)
    )),
    byId: (id: number, cb: transactionCallback) => db.transaction((tx) => tx.executeSql(
      `SELECT * FROM ${tableNames.TRAINING} WHERE id=?;`,
      [id],
      (tx, results) => cb(results, tx),
      (tx, err) => logTxError.read(err, tableNames.TRAINING)
    ))
  }),
  update: (data: {id: number, name?: string, details?: string}, cb?: transactionCallback) => db.transaction((tx) => {
    const {id, name, details} = data;
    const values = [name, details].filter((item) => item !== undefined);
    const valuesString = [`name=?`, `details=?`].join(", ");
    const SQLStatement = `UPDATE ${tableNames.TRAINING} SET ${valuesString} WHERE id=?;`;
    return tx.executeSql(
      SQLStatement,
      [...values, id],
      (tx, results) => cb && cb(results, tx),
      (tx, err) => logTxError.update(err, tableNames.TRAINING, data)
    )
  }),
  updateWithExercises: (training: Training, exerciseList: ExerciseEdition[], cb?: transactionCallback) => db.transaction((tx) => {
    const {id, name, details} = training;
    const exerciseCreates = exerciseList.filter((exercise) => exercise.status === "created");
    const exerciseUpdates = exerciseList.filter((exercise) => exercise.status === "edited");
    const exerciseDeletes = exerciseList.filter((exercise) => exercise.status === "deleted");
    
    const deleteExercisesCallback: transactionCallback = (results, tx) => {
      if(exerciseDeletes.length > 0){
        console.log("Deleting exercises");
        return tx.executeSql(
          exerciseDeletes.map((exercise) => `DELETE FROM ${tableNames.EXERCISES} WHERE id=?;`).join("\n"),
          exerciseDeletes.map((exercise) => exercise.id),
          (tx, results) => cb && cb(results, tx),
          (tx, err) => logTxError.delete(err, tableNames.EXERCISES, exerciseDeletes)
        );
      }
      return cb && cb(results, tx);
    }

    const updateExercisesCallback: transactionCallback = (results, tx) => {
      if(exerciseUpdates.length > 0){
        console.log("Updating exercises");
        const fieldNames = ["name", "details"];
        const exerciseValuesString = fieldNames.map((fieldName) => `${fieldName}=?`).join(", ");
        return tx.executeSql(
          exerciseUpdates.map((exercise) => `UPDATE ${tableNames.EXERCISES} SET ${exerciseValuesString} WHERE id=?;`).join("\n"),
          flatten(exerciseUpdates.map((exercise) => [exercise.name, exercise.details, exercise.id])),
          (tx, results) => deleteExercisesCallback(results, tx),
          (tx, err) => logTxError.update(err, tableNames.EXERCISES, exerciseUpdates)
        );
      }
      return deleteExercisesCallback(results, tx);
    };

    const createExercisesCallback: transactionCallback = (results, tx) => {
      if(exerciseCreates.length > 0){
        console.log("Creating exercises");
        return tx.executeSql(
          `INSERT INTO ${tableNames.EXERCISES} ${tableValues.EXERCISES} VALUES ${exerciseCreates.map(() => `(?, ?, ?)`).join(", ")};`,
          flatten(exerciseCreates.map((exercise) => [exercise.name, exercise.details, training.id])),
          (tx, results) => updateExercisesCallback(results, tx),
          (tx, err) => logTxError.create(err, tableNames.EXERCISES, exerciseCreates)
        );
      }
      return updateExercisesCallback(results, tx);
    }

    console.log("Updating training");
    const trainingValues = [name, details];
    const fieldNames = ["name", "details"];
    const trainingValuesString = fieldNames.map((fieldName) => `${fieldName}=?`).join(", ");
    return tx.executeSql(
      `UPDATE ${tableNames.TRAINING} SET ${trainingValuesString} WHERE id=?;`,
      [...trainingValues, id],
      (tx, results) => createExercisesCallback(results, tx),
      (tx, err) => logTxError.update(err, tableNames.TRAINING, training)
    )
  }),
  delete: (id: number, cb?: transactionCallback) => db.transaction((tx) => tx.executeSql(
    `DELETE FROM ${tableNames.TRAINING} WHERE id=?`,
    [id],
    (tx, results) => cb && cb(results, tx),
    (tx, err) => logTxError.delete(err, tableNames.TRAINING, id)
  )),
  deleteWithExercises: (id: number, cb?: transactionCallback) => {
    const deleteExercisesCallback: transactionCallback = (result, tx) => tx.executeSql(
      `DELETE FROM ${tableNames.EXERCISES} WHERE trainingId=?;`,
      [result.insertId],
      (tx, results) => cb && cb(results, tx),
      (tx, err) => logTxError.delete(err, tableNames.EXERCISES, {byTrainingId: result.insertId})
    );
  
    return db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${tableNames.TRAINING} WHERE id=?`,
        [id],
        (tx, results) => deleteExercisesCallback,
        (tx, err) => logTxError.delete(err, tableNames.TRAINING, id)
      )
    });
  }
})

export const exerciseCrud = Object.freeze({
  create: (data: Exercise, cb?: transactionCallback) => db.transaction((tx) => tx.executeSql(
    `INSERT INTO ${tableNames.EXERCISES} ${tableValues.EXERCISES} VALUES (?, ?, ?);`,
    [data.name, data.details, data.trainingId],
    (tx, result) => cb && cb(result, tx),
    (tx, err) => logTxError.create(err, tableNames.EXERCISES, data)
  )),
  read: Object.freeze({
    all: (cb: transactionCallback) => db.transaction((tx) => tx.executeSql(
      `SELECT * FROM ${tableNames.EXERCISES};`,
      [],
      (tx, results) => cb(results, tx),
      (tx, err) => logTxError.read(err, tableNames.EXERCISES)
    )),
    byId: (id: number, cb: transactionCallback) => db.transaction((tx) => tx.executeSql(
      `SELECT * FROM ${tableNames.EXERCISES} WHERE id=?;`,
      [id],
      (tx, results) => cb(results, tx),
      (tx, err) => logTxError.read(err, tableNames.EXERCISES)
    )),
    byTrainingId: (id: number, cb: transactionCallback) => db.transaction((tx) => tx.executeSql(
      `SELECT * FROM ${tableNames.EXERCISES} WHERE trainingId=?;`,
      [id],
      (tx, results) => cb(results, tx),
      (tx, err) => logTxError.read(err, tableNames.EXERCISES)
    ))
  }),
  update: (data: {id: number, name?: string, details?: string}, cb?: transactionCallback) => db.transaction((tx) => {
    const {id, name, details} = data;
    const values = [name, details].filter((item) => item !== undefined);
    const valuesString = values.map((item) => `${item}=?`).join(", ");
    return tx.executeSql(
      `UPDATE ${tableNames.EXERCISES} SET ${valuesString} WHERE id=?`,
      [...values, id],
      (tx, results) => cb && cb(results, tx),
      (tx, err) => logTxError.update(err, tableNames.EXERCISES, data)
    )
  }),
  delete: Object.freeze({
    byId: (id: number, cb?: transactionCallback) => db.transaction((tx) => tx.executeSql(
      `DELETE FROM ${tableNames.EXERCISES} WHERE id=?`,
      [id],
      (tx, results) => cb && cb(results, tx),
      (tx, err) => logTxError.delete(err, tableNames.EXERCISES, {byId: id})
    )),
    byTrainingId: (trainingId: number, cb?: transactionCallback) => db.transaction((tx) => tx.executeSql(
      `DELETE FROM ${tableNames.EXERCISES} WHERE trainingId=?`,
      [trainingId],
      (tx, results) => cb && cb(results, tx),
      (tx, err) => logTxError.delete(err, tableNames.EXERCISES, {byTrainingId: trainingId})
    ))
  })
});


export default db;