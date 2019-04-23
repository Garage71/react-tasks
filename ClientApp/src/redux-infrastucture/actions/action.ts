export interface IAction<T = {}> {
    type: ActionType;
    payload?: T;
  }

export class Action<T = {}> implements IAction<T> {
    public type: ActionType;
    public payload?: T;
  }

  export enum ActionType {
    GET_TASKS,    
}