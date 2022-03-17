import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import ThemeSettings from './layouts/full-layout/customizer/ThemeSettings';
import Router from './routes/Router';
import 'react-perfect-scrollbar/dist/css/styles.css';
import useUserInfo from './hooks/useUserInfo';

const App = () => {
  const theme = ThemeSettings();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { level } = useUserInfo();
  const routing = useRoutes(Router(isLoggedIn, level));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
};

export default App;
