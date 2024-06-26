import { combineReducers } from 'redux';
import { questsReducer } from './quests';
import { bookingReducer } from './booking';
import { reservationsReducer } from './reservations';
import { filtersReducer } from './filters';
import { authReducer } from './authorization';
import { NameSpace } from '../../const';

const rootReducer = combineReducers({
  [NameSpace.Quests]: questsReducer,
  [NameSpace.Booking]: bookingReducer,
  [NameSpace.Reservations]: reservationsReducer,
  [NameSpace.Filters]: filtersReducer,
  [NameSpace.Auth]: authReducer,
});

export default rootReducer;
