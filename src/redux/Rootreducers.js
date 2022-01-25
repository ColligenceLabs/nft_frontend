import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import wallet from './slices/wallet';

const RootReducers = combineReducers({
  CustomizerReducer,
  wallet,
  auth: authReducer,
  message: messageReducer,
});

export default RootReducers;
