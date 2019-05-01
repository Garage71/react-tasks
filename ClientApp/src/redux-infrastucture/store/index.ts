import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import realtimeSagas from '../sagas-middleware/realtimeSagas';
import sagas from '../sagas-middleware/sagas';
import { initialState } from './initialState';

const composeEnhancers =
  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];
const appliedMiddleware = applyMiddleware(...middlewares);

const enhancer = composeEnhancers(appliedMiddleware);

const store = createStore(
  rootReducer,
  initialState as any,
  enhancer
);

sagaMiddleware.run(sagas);
sagaMiddleware.run(realtimeSagas);

export default store;