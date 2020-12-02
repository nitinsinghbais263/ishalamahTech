import { combineReducers } from 'redux';
import * as logInReducers from './login';
import * as registrationReducers from './registration';
import * as profileReducers from './user';
import * as statusReducers from './status';
import * as jobsReducers from './jobs';
import * as cashbookReducers from './cashbook'
import * as ticketReducers from './ticket'
import * as notesReducers from './notes';

export default combineReducers(Object.assign(
  logInReducers,
  registrationReducers,
  profileReducers,
  statusReducers,
  jobsReducers,
  cashbookReducers,
  ticketReducers,
  notesReducers
));
