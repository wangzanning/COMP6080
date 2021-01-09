import {combineReducers} from 'redux';

const token = ((state = {token: ''}, action) => {
  switch (action.type) {
    case 'setToken':
      return {
        ...state,
        token: action.value,
      };
    default:
      return state;
  }
})

const id = ((state = {id: ''}, action) => {
  switch (action.type) {
    case 'setID':
      return {
        ...state,
        id: action.value,
      };
    default:
      return state;
  }
})

let rootReducers = combineReducers({token, id})
export default rootReducers;