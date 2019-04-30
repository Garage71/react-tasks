import { IApiState } from './apiState';
import { Filter, ITask } from './tasksState';


export interface IState {
    tasks: ITask[];
    api: IApiState;
    filter: Filter;
    selectedTaskId: number | null;
}