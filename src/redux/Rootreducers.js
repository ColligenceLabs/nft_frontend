import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';

import wallet from './slices/wallet';

const RootReducers = combineReducers({
  CustomizerReducer,

  wallet,
});

export default RootReducers;
