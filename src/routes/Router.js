import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full-layout/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full-layout/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank-layout/BlankLayout')));
/* ***End Layouts**** */

const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));

const Dashboard = Loadable(lazy(() => import('../views/Dashboard')));
const User = Loadable(lazy(() => import('../views/User')));
const Company = Loadable(lazy(() => import('../views/Company')));
const NFTs = Loadable(lazy(() => import('../views/NFTs')));
const NFTMint = Loadable(lazy(() => import('../views/NFTs/NFTMint')));
const AirDrop = Loadable(lazy(() => import('../views/AirDrop')));
const AirDropMint = Loadable(lazy(() => import('../views/AirDrop/AirDropMint')));
const Serials = Loadable(lazy(() => import('../views/Serials')));
const Transaction = Loadable(lazy(() => import('../views/Transaction')));
const Collection = Loadable(lazy(() => import('../views/Collection')));
const Reward = Loadable(lazy(() => import('../views/Reward')));

/* ****Routes***** */
const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/user', exact: true, element: <User /> },
      { path: '/company', exact: true, element: <Company /> },
      { path: '/nfts', exact: true, element: <NFTs /> },
      { path: '/nfts/mint', exact: true, element: <NFTMint /> },
      { path: '/airdrop', exact: true, element: <AirDrop /> },
      { path: '/airdrop/mint', exact: true, element: <AirDropMint /> },
      { path: '/serials', exact: true, element: <Serials /> },
      { path: '/transaction', exact: true, element: <Transaction /> },
      { path: '/collection', exact: true, element: <Collection /> },
      { path: '/reward', exact: true, element: <Reward /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: 'auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
