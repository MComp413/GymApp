import { openDatabase } from 'react-native-sqlite-storage';
import { Exercise, Training } from '../constants/types';
import { tableNames, tableSchemas, tableValues } from '../constants/constants';


const db = openDatabase(
  { name: "gym.db", location: "default" },
  () => {
    initTable();
    console.log("deu bom");
  },
  () => console.log("deu ruim")
)

function initTable(){
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS TABLE ${tableSchemas.TRAINING};
       CREATE TABLE IF NOT EXISTS TABLE ${tableSchemas.EXERCISES};`
    )
  })  
}

export const trainingCrud = Object.freeze({
  create: (data: Training, cb: any = undefined) => db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${tableNames.TRAINING} ${tableValues.TRAINING} VALUES (?, ?);`,
        [data.name, data.details],
        (tx, result) => cb && cb(result.rows)
      )
    }),
  read: Object.freeze({
    all: (cb: any) => db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableNames.TRAINING};`,
          [],
          (tx, results) => cb(results.rows)
        )
      }),
    byId: (id: number, cb: any) => db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableNames.TRAINING} WHERE id=?;`,
          [id],
          (tx, results) => cb(results.rows)
        )
      })
  }),
  update: (data: {id: number, name?: string, details?: string}, cb: any = undefined) => db.transaction((tx) => {
    const {id, name, details} = data;
    const values = [name, details].filter((item) => item !== undefined);
    const valuesString = values.map((item, index) => `${item} = ?`).join(", ");
    tx.executeSql(
      `UPDATE ${tableNames.TRAINING} SET ${valuesString} WHERE id=?`,
      [...values, id],
      (tx, results) => cb && cb(results.rows)
    )
  }),
  delete: (id: number, cb: any = undefined) => db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM TABLE ${tableNames.TRAINING} WHERE id=?`,
      [id],
      (tx, results) => cb && cb(results.rows)
    )
  })
})

export const exerciseCrud = Object.freeze({
  create: (data: Exercise, cb: any = undefined) => db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO ${tableNames.EXERCISES} ${tableValues.EXERCISES} VALUES (?, ?, ?);`,
      [data.name, data.details, data.trainingId],
      (tx, result) => cb && cb(result.rows)
    )
  }),
  read: Object.freeze({
    all: (cb: any) => db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableNames.EXERCISES};`,
          [],
          (tx, results) => cb(results.rows)
        )
      }),
    byId: (id: number, cb: any) => db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableNames.EXERCISES} WHERE id=?;`,
          [id],
          (tx, results) => cb(results.rows)
        )
      }),
    byTrainingId: (id: number, cb: any) => db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM ${tableNames.EXERCISES} WHERE training=?;`,
          [id],
          (tx, results) => cb(results.rows)
        )
      })
  }),
  update: (data: {id: number, name?: string, details?: string}, cb: any = undefined) => db.transaction((tx) => {
    const {id, name, details} = data;
    const values = [name, details].filter((item) => item !== undefined);
    const valuesString = values.map((item, index) => `${item} = ?`).join(", ");
    tx.executeSql(
      `UPDATE ${tableNames.EXERCISES} SET ${valuesString} WHERE id=?`,
      [...values, id],
      (tx, results) => cb && cb(results.rows)
    )
  }),
  delete: (id: number, cb: any = undefined) => db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM TABLE ${tableNames.EXERCISES} WHERE id=?`,
      [id],
      (tx, results) => cb && cb(results.rows)
    )
  })
});

export default db;