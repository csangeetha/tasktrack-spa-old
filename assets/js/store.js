import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


function tasks(state = [], action) {
  switch (action.type) {
    case 'CREATE_TASK':
    return [action.task, ...state];
    case 'ALL_TASKS':
    return [...action.tasks];
    default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'ALL_USERS':
    return [...action.users];
    case 'CREATE_USER':
    return [action.user, ...state];
    default:
    return state;
  }
}

let empty_task = {
  assigned_to_id: "",
  assigned_by_id: "",
  title: "",
  description: "",
  time_taken: "",
  status: false,
  token : " "
}

function form(state = [], action){
  switch (action.type) {
    case 'UPDATE_FORM':
    return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
    return empty_task;
    case 'SET_TOKEN':
    return Object.assign({}, state, {token: action.token});
    default:
    return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
    return action.token;
    default:
    return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
};

let empty_signup = {
  signup_email : "",
  signup_name: "",
  signup_pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
    return Object.assign({}, state, action.data);
    default:
    return state;
  }
}

function signup(state = empty_signup, action) {
  switch (action.type) {
    case 'UPDATE_SIGNUP_FORM':
    return Object.assign({}, state, action.data);
    default:
    return state;
  }
}

function root_reducer(state0 , action){
  let reducer = combineReducers({users , tasks , form ,token, login , signup});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
