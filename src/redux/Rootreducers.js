import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import wallet from './slices/wallet';
import nft from './slices/nft';

const RootReducers = combineReducers({
  CustomizerReducer,
  wallet,
  auth: authReducer,
  message: messageReducer,
  nft,
});

export default RootReducers;
