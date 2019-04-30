import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from '../actions/action';
import * as Actions from '../actions/actions';
import * as ActionTypes from '../actions/actionTypes';
import { ITask } from '../store/tasksState';
import * as api from './api';
import MoqServer from './moqServer';

function* getTasks () {
  const result = yield call(api.getTasks);
  if(!result.error) {
    yield put(Actions.setTasks(result.data));
  } else {
    yield put(Actions.setTasks(MoqServer.getTasks()));
  }
}

function* addNewTask (action: Action<ITask>) {
  const { payload } = action;
  const result = yield call(api.createTask, payload as ITask);
  if(!result.error) {
    yield put(Actions.addNewTaskComplete(result.data));
  } else {
    yield put(Actions.addNewTaskComplete(MoqServer.addTask(payload as ITask)));
  }
  return result;
}

function* completeTask (action: Action<number>) {
  const { payload } = action;
  const result = yield call(api.completeTask, payload as number);
  yield put(Actions.completeTaskComplete(payload as number));
  return result;
}

function* removeTask (action: Action<number>) {
  const { payload } = action;
  const result = yield call(api.removeTask, payload as number);
  yield put(Actions.removeTaskComplete(payload as number));
  return result;
}

function* watch(): SagaIterator {    
  yield takeEvery(ActionTypes.ADD_NEW_TASK_REQUEST, addNewTask);
  yield takeEvery(ActionTypes.GET_TASKS_REQUEST, getTasks);
  yield takeEvery(ActionTypes.COMPLETE_TASK_REQUEST, completeTask);
  yield takeEvery(ActionTypes.REMOVE_TASK_REQUEST, removeTask);
}
  
export default watch;