import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
   const store = createStore(
      combineReducers({
         ...createForms({
            feedback: InitialFeedback
         })
      }),
      applyMiddleware(thunk, logger)
   );
   
   return store;
}