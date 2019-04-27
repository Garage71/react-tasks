import { IApiState } from './apiState';
import { ITask } from './tasksState';

export interface IState {
    tasks: ITask[];
    api: IApiState;
}