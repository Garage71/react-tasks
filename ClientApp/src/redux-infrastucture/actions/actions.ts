import { Filter, ITask } from '../store/tasksState';
import { Action } from './action';
import * as ActionType from './actionTypes';

export const getTasks = (): Action => {
  return {
    type: ActionType.GET_TASKS_REQUEST,
  };
};

export const setTasks = (payload: ITask[]): Action => {
  return {
    type: ActionType.GET_TASKS_COMPLETE,
    payload,
  };
};

export const addNewTaskRequest = (payload: ITask) : Action => {
  return {
    type: ActionType.ADD_NEW_TASK_REQUEST,
    payload,
  };
};

export const addNewTaskComplete = (payload: ITask) : Action => {
  return {
    type: ActionType.ADD_NEW_TASK_COMPLETE,
    payload,
  };
};

export const completeTaskRequest = (payload: number) : Action => {
  return {
    type: ActionType.COMPLETE_TASK_REQUEST,
    payload,
  };
};

export const completeTaskComplete = (payload: number) : Action<number> => {
  return {
    type: ActionType.COMPLETE_TASK_COMPLETE,
    payload,
  };
};

export const removeTaskRequest = (payload: number) : Action<number> => {
  return {
    type: ActionType.REMOVE_TASK_REQUEST,
    payload,
  };
};

export const removeTaskComplete = (payload: number) : Action => {
  return {
    type: ActionType.REMOVE_TASK_COMPLETE,
    payload,
  };
};

export const setFilter = (payload: Filter) : Action<Filter> =>  {
  return {
    type: ActionType.SET_TASKS_FILTER,
    payload,
  };
};

export const setSelectedTaskId = (payload: number) : Action<Filter> =>  {
  return {
    type: ActionType.SET_SELECTED_TASK_ID,
    payload,
  };
};