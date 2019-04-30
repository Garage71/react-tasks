import { createSelector } from 'reselect';
import { Filter, ITask } from '../store/tasksState';

const tasks = (state: any) => state.tasks.tasks;
const filter = (state: any) => state.tasks.filter;

export const hashMap = createSelector(tasks, (ts) => {
  const hashmap = ts.reduce( (hash: any, task: any) => {
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