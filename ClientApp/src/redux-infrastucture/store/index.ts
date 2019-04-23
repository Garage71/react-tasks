import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import rootReducer from '../reducers';
import { initialState } from './initialState';

const composeEnhancers =
      typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
        ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
        : compose;

const middlewares: Middleware[] = [];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default createStore(
    rootReducer,
    initialState as any,
    enhancer,
);