import * as loginActions from './login';
import * as registrationActions from './registration';
import * as profileActions from './user';
import * as statusActions from './status';
import * as jobsActions from './jobs';
import * as cashbookActions from './cashbook';
import * as ticketActions from './ticket';
import * as notesActions from './notes';

export const ActionCreators = Object.assign({},
  loginActions,
  registrationActions,
  profileActions,
  statusActions,
  jobsActions,
  cashbookActions,
  ticketActions,
  notesActions
);
