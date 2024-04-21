import { combineReducers } from 'redux';
import { questsReducer } from './quests';
import { filtersReducer } from './filters';
import { NameSpace } from '../../const';

const rootReducer = combineReducers({
  [NameSpace.Quests]: questsReducer,
  [NameSpace.Filters]: filtersReducer,
});

export default rootReducer;
