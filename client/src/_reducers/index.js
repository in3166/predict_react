import { combineReducers } from 'redux';
import user from './user_reducer';
import engine from './engine_reducer';
import site from './site_reducer';

// STORE에 reducer 여러개 존재, state이 어떻게 변하는지 보여주고 마지막 결과를 리턴
const rootReducer = combineReducers({
  user,
  engine,
  site,
});

export default rootReducer;
