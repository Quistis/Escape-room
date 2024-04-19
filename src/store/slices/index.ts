import { combineReducers } from 'redux';
import { questsReducer } from './quests';
import { NameSpace } from '../../const';

const rootReducer = combineReducers({
  [NameSpace.Quests]: questsReducer,
});

export default rootReducer;
