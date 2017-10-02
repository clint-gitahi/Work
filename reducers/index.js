import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobsReducer';

export default combineReducers({
  auth,
  jobs
});
