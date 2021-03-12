import { createStore, Action } from 'redux';
import { initialState, State } from './state';

function reducer(oldState: State = initialState, action: Action){
  const newState = {...oldState};
}