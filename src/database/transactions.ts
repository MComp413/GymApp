import { openDatabase, ResultSetRowList, SQLError, Transaction } from 'react-native-sqlite-storage';
import { Exercise, Training, transactionCallback } from '../constants/types';
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
    const writeExercisesCallback: transactionCallback = (result, tx) => {
      const trainingId = result.insertId;
      console.log(trainingId);
      const SQLStatement = `INSERT INTO ${tableNames.EXERCISES} ${tableValues.EXERCISES} VALUES ${exerciseList.map(() => `(?, ?, ?)`).join(", ")};`;
      const vals: (number | string)[] = [];
      exerciseList.forEach((exercise) => {
        vals.push(exercise.name, exercise.details, trainingId);
      });
      console.log(vals);
      const values = flatten(exerciseList.map((exercise) => [exercise.name, exercise.details, trainingId]));
      console.log(values);
      tx.executeSql(
        SQLStatement,
        values,
        (tx, results) => cb && cb(results, tx),
        (tx, err) => logTxError.create(err, tableNames.EXERCISES, {byTrainingId: trainingId})
      );
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
    const valuesString = values.map((item, index) => `${item} = ?`).join(", ");
    return tx.executeSql(
      `UPDATE ${tableNames.TRAINING} SET ${valuesString} WHERE id=?`,
      [...values, id],
      (tx, results) => cb && cb(results, tx),
      (tx, err) => logTxError.update(err, tableNames.TRAINING, data)
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