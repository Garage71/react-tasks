import { createSelector } from 'reselect';
import { Filter, ITask } from '../store/tasksState';

const tasks = (state: any) => state.tasks.tasks;
const filter = (state: any) => state.tasks.filter;
const selectedTaskId = (state: any) => state.tasks.selectedTaskId;

export const hashMap = createSelector(tasks, (ts) => {
  const hashmap = ts.reduce((hash: any, task: any) => {
    hash[task.taskId] = task;
    return hash;
  }, {});
  return hashmap;
});

export const filteredTasks = createSelector(tasks, filter, 
  (ts, f) => {
    const filterFlag = f as unknown as Filter;
    switch(filterFlag) {
      case Filter.All:
        return ts;
      case Filter.Active:
        return ts.filter((task: ITask) => task.isActive);
      case Filter.Completed:
        return ts.filter((task: ITask) => !task.isActive);
      default:
        return ts;
    }
});

export const selectedTask = createSelector(tasks, selectedTaskId, 
  (ts, id) => {
    if(!id || ts.length === 0) {
      return null;
    }
    const sId = id as string;
    // tslint:disable-next-line:radix
    const taskId = Number.parseInt(sId);
    const task  = ts.find((t: ITask) => t.taskId === taskId);
    return task ? task: null;
  });