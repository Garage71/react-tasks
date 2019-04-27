import { IState } from './state';

export const initialState: IState = {
    api: {
        isMocked: false,
        isOffline: false,
    },
    tasks: [],
};