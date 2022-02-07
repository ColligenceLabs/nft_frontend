import React, { useState } from 'react';
import { Grid, Box, Typography, Button, MenuItem, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { register } from '../../services/auth.service';
import * as yup from 'yup';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import PageContainer from '../../components/container/PageContainer';
import CustomSelect from '../../components/forms/custom-elements/CustomSelect';

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),

  level: yup.string('Enter your name').required('Name is required'),
});

const Register = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [successRegister, setSuccessRegister] = useState(false);

  return (
    <PageContainer title="Register" description="this is Register page">
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
                  Welcome to NFT Management System
                </Typography>
                {successRegister ? (
                  <Box display="flex" alignItems="center">
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      sx={{
                        mr: 1,
                      }}
                    >
                      Success in sign up
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/login"
                      fontWeight="500"
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Sign In
                    </Typography>
                  </Box>
                ) : (
                  <div>
                    <Box display="flex" alignItems="center">
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        sx={{
                          mr: 1,
                        }}
                      >
                        Already have an Account?
                      </Typography>
                      <Typography
                        component={Link}
                        to="/auth/login"
                        fontWeight="500"
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        Sign In
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: 4,
                      }}
                    >
                      <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                          name: '',
                          email: '',
                          password: '',
                          repeatPassword: '',
                          level: '',
                        }}
                        onSubmit={async (data, { setSubmitting }) => {
                          setSubmitting(true);

                          const res = await register(
                            data.name,
                            data.email,
                            data.password,
                            data.level,
                          );

                          if (res.data.status === 1) {
                            setErrorMessage(null);
                            setSuccessRegister(true);
                          } else {
                            setErrorMessage(res.data.message);
                          }
                        }}
                      >
                        {({
                          values,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          touched,
                          errors,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                            <CustomTextField
                              id="name"
                              name="name"
                              variant="outlined"
                              fullWidth
                              value={values.name}
                              onChange={handleChange}
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                            <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                            <CustomTextField
                              id="email"
                              name="email"
                              variant="outlined"
                              fullWidth
                              value={values.email}
                              onChange={handleChange}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                            />
                            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                            <CustomTextField
                              id="password"
                              name="password"
                              type="password"
                              variant="outlined"
                              fullWidth
                              value={values.password}
                              onChange={handleChange}
                              error={touched.password && Boolean(errors.password)}
                              helperText={touched.password && errors.password}
                            />
                            <CustomFormLabel htmlFor="password">Password Confirm</CustomFormLabel>
                            <CustomTextField
                              id="repeatPassword"
                              name="repeatPassword"
                              type="password"
                              variant="outlined"
                              fullWidth
                              value={values.repeatPassword}
                              onChange={handleChange}
                              error={touched.repeatPassword && Boolean(errors.repeatPassword)}
                              helperText={touched.repeatPassword && errors.repeatPassword}
                            />

                            <CustomFormLabel htmlFor="level">Level</CustomFormLabel>
                            <CustomSelect
                              labelId="demo-simple-select-label"
                              id="level"
                              name="level"
                              onChange={handleChange}
                              value={values.level}
                              fullWidth
                              sx={{
                                mb: 4,
                              }}
                              error={touched.level && Boolean(errors.level)}
                              // helperText={touched.repeatPassword && errors.repeatPassword}
                            >
                              <MenuItem value="administrator">Administrator</MenuItem>
                              <MenuItem value="creator">Creator</MenuItem>
                              <MenuItem value="operator">Operator</MenuItem>
                            </CustomSelect>

                            {errorMessage && (
                              <Alert
                                sx={{
                                  mb: 4,
                                }}
                                variant="filled"
                                severity="error"
                              >
                                {errorMessage}
                              </Alert>
                            )}

                            <Button
                              type="submit"
                              color="secondary"
                              variant="contained"
                              size="large"
                              fullWidth
                              sx={{
                                pt: '10px',
                                pb: '10px',
                              }}
                              disabled={isSubmitting}
                            >
                              Register
                            </Button>
                          </form>
                        )}
                      </Formik>
                    </Box>
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Register;
