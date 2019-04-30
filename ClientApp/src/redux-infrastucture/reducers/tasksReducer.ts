import { Action } from '../actions/action';
import * as ActionType from '../actions/actionTypes';
import { initialState } from '../store/initialState';
import { IState } from '../store/state';
import { Filter, ITask } from '../store/tasksState';

export default (state: IState, action: Action): IState => {    
        
    switch(action.type) {
        case ActionType.GET_TASKS_REQUEST:
        case ActionType.ADD_NEW_TASK_REQUEST:
        case ActionType.COMPLETE_TASK_REQUEST:
        case ActionType.REMOVE_TASK_REQUEST:
            return {
                ...state,
            };

        case ActionType.GET_TASKS_COMPLETE:        
            const payloadTasks: ITask[] = action.payload as ITask[];
            return {                
                ...state,
                tasks: payloadTasks,
            };
        
        case ActionType.ADD_NEW_TASK_COMPLETE:
            const task: ITask = action.payload as ITask;
            const newTasks = [...state.tasks];
            newTasks.push(task);
            return {
                ...state,
                tasks: newTasks,
            };

        case ActionType.COMPLETE_TASK_COMPLETE:
            const taskId: number = action.payload as number;
            const nTs = [...state.tasks];
            const newTask = nTs.find(t => t.taskId === taskId);
            let filtered= nTs;
            if(newTask) {
                const completed : ITask = {
                    ...newTask,
                    isActive: false,
                };
                filtered = nTs.map(ts => ts.taskId === taskId ? completed : ts);
            }
            return {
                ...state,
                tasks: filtered,
            };

        case ActionType.REMOVE_TASK_COMPLETE:
            const Id: number = action.payload as number;
            filtered = [...state.tasks].filter(ts => ts.taskId !== Id);
            return {
                ...state,
                tasks: filtered,
            };
        
        case ActionType.SET_TASKS_FILTER:
            const filter = action.payload as Filter;
            return {
                ...state,
                filter,
            };
        default:
            return initialState;
    }
};