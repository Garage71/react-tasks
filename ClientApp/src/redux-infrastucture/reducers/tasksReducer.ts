import { Action, ActionType,  } from '../actions/action'
import { initialState } from '../store/initialState';
import { IState } from '../store/state';

export default (state: IState, action: Action) => {
    switch(action.type) {
        case ActionType.GET_TASKS:
            return {...state};
        default:
            return initialState;
    }
}