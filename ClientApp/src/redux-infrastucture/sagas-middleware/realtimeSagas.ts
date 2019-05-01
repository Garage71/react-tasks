import * as signalR from '@aspnet/signalr/dist/esm';
import { eventChannel} from 'redux-saga';
import {all, call, cancelled, put, race, take} from 'redux-saga/effects';
import * as Actions from '../actions/actions';
import { ITask } from '../store/tasksState';

let connection: signalR.HubConnection;

const connect = () : signalR.HubConnection => {
  const conn = new signalR.HubConnectionBuilder()
    .withUrl("/taskhub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
  
    conn.start().catch(()=> console.log("SingalR connection error"));
      
  return conn;
};

const createConnectionChannel = (conn: signalR.HubConnection) => eventChannel((emit) => {
  const createHandler = (data: any) => { emit({type: 'create', data}); };
  const removeHandler = (data: any) => { emit({type: 'remove', data}); };
  const completeHandler = (data: any) => { emit({type: 'complete', data}); };
  conn.on('Create', createHandler);
  conn.on('Remove', removeHandler);
  conn.on('Complete', completeHandler);
  return () => {
    conn.off('Create', createHandler);
    conn.off('Remove', removeHandler);
    conn.off('Complete', completeHandler);
  };
});


const listenServerSaga = function* () {
    try {
      connection = yield call(connect);
      const socketChannel = yield call(createConnectionChannel, connection);      
  
      while (true) {
        const payload = yield take(socketChannel);
        switch(payload.type) {
          case 'create':
            yield put(Actions.addNewTaskComplete(payload.data as ITask));
            break;
          case 'remove':
            yield put(Actions.removeTaskComplete(payload.data.taskId));
            break;
          case 'complete':
            yield put(Actions.completeTaskComplete(payload.data.taskId));
        }        
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (yield cancelled()) {
        connection.stop();
      }
    }
  };

const startChannel = function* () {
    while (true) {
      yield race({
        task: call(listenServerSaga),
      });
    }
};

export default function* rootSaga() {
  yield all([
    startChannel(),
  ]);
}