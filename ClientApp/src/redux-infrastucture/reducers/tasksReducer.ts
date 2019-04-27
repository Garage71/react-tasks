import { Action, ActionType,  } from '../actions/action'
import { initialState } from '../store/initialState';
import { IState } from '../store/state';
import { ITask } from '../store/tasksState';

export default (state: IState, action: Action): IState => {
    switch(action.type) {
        case ActionType.GET_TASKS:
            const tasks: ITask[] = action.payload as ITask[];
            return {                
                ...state,
                tasks,
            };
        default:
            return initialState;
    }
}