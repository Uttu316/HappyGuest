import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {AuthReducer} from './reducers/AuthReducer';
import {UtilsReducer} from './reducers/UtilsReducer';
import {UserDetailsReducer} from './reducers/UserDetailsReducer';
const rootReducer = combineReducers({
  auth: AuthReducer,
  utils: UtilsReducer,
  userData: UserDetailsReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
