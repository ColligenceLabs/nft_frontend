import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';

import wallet from './slices/wallet';
import nft from './slices/nft';

const RootReducers = combineReducers({
  CustomizerReducer,

  wallet,
  nft,
});

export default RootReducers;
