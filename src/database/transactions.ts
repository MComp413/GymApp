import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase(
  { name: "test.db", location: "default" },
  () => console.log("deu bom"),
  () => console.log("deu ruim")
)