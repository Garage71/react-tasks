import { IState } from './state';
import { Filter } from './tasksState';

export const initialState: IState = {
  api: {
    isMocked: false,
    isOffline: false,
  },
  tasks: [],
  filter: Filter.All,
  selectedTaskId: null,
};