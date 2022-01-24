import React, { useState } from 'react';
import { Grid, Box, Typography, FormGroup, FormControlLabel, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import PageContainer from '../../components/container/PageContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSignin = () => {
    const data = {
      email,
      password,
    };

    const apiUrl = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/login`;
    console.log(data);
    console.log(apiUrl);

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{ height: '100vh', justifyContent: 'center' }}>
        <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9} xl={6}>
              <Box
                sx={{
                  p: 4,
                }}
              >
                <Typography fontWeight="700" variant="h2">
                  Welcome to Flexy
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="500"
                    sx={{
                      mr: 1,
                    }}
                  >
                    New to Flexy?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/auth/register"
                    fontWeight="500"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Create an account
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                  }}
                >
                  <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                  <CustomTextField
                    id="email"
                    value={email}
                    onChange={onChangeEmail}
                    variant="outlined"
                    fullWidth
                  />
                  <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                  <CustomTextField
                    id="password"
                    value={password}
                    type="password"
                    variant="outlined"
                    fullWidth
                    onChange={onChangePassword}
                    sx={{
                      mb: 3,
                    }}
                  />
                  <Box
                    sx={{
                      display: {
                        xs: 'block',
                        sm: 'flex',
                        lg: 'flex',
                      },
                      alignItems: 'center',
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CustomCheckbox defaultChecked />}
                        label="Remeber this Device"
                        sx={{
                          mb: 2,
                        }}
                      />
                    </FormGroup>
                    <Box
                      sx={{
                        ml: 'auto',
                      }}
                    >
                      <Typography
                        component={Link}
                        to="/auth/reset-password"
                        fontWeight="500"
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          mb: '16px',
                          color: 'primary.main',
                        }}
                      >
                        Forgot Password ?
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    to="/"
                    sx={{
                      pt: '10px',
                      pb: '10px',
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={onSignin}
                    to="/"
                    sx={{
                      mt: '10px',
                      pt: '10px',
                      pb: '10px',
                    }}
                  >
                    Sign In (JTW Test)
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
