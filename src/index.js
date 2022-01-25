import React, { Suspense } from 'react';
import {ethers} from 'ethers';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './redux/Store';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import Spinner from './components/spinner/Spinner';
import './localization';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

// function getLibrary(provider) {
//   const library = new Web3Provider(provider);
//   library.pollingInterval = 12000;
//   return library;
// }

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={configureStore()}>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </Web3ReactProvider>,
  document.getElementById('root'),
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
