import { ResultSet, Transaction } from "react-native-sqlite-storage"

export type Exercise = {
    id: number,
    name: string,
    details: string,
    trainingId: number
}

export type Training = {
    id: number
    name: string,
    details: string
}

export type transactionCallback = (result: ResultSet, tx: Transaction) => void;