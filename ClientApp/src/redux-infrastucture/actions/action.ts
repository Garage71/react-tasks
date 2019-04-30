export interface IAction<T = {}> {
  type: string;
  payload?: T;
}

export class Action<T = {}> implements IAction<T> {
  public type: string;
  public payload?: T;
}