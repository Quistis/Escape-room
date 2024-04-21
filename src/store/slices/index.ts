import { combineReducers } from 'redux';
import { questsReducer } from './quests';
import { filtersReducer } from './filters';
import { authReducer } from './authorization';
import { NameSpace } from '../../const';

const rootReducer = combineReducers({
  [NameSpace.Quests]: questsReducer,
  [NameSpace.Filters]: filtersReducer,
  [NameSpace.Auth]: authReducer,
});

export default rootReducer;
