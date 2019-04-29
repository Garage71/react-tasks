import { createSelector } from 'reselect';


const tasks = (state: any) => state.tasks.tasks;

export default createSelector(tasks, (ts) => {
    const hashmap = ts.reduce( (hash: any, task: any) => {
        hash[task.taskId] = task;
        return hash;
    }, {});
    return hashmap;
});