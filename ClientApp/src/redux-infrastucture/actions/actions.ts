import { Action, ActionType } from './action';

export const getTasks = (): Action => {
    return {
        type: ActionType.GET_TASKS
    };
};