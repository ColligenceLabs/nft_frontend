import React, { useState } from 'react';
import { Grid, Box, Typography, Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
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
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    level: '',
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      level: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleRegisterDataChange = (event) => {
    const { name, value } = event.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const registerHandler = () => {
    console.log(registerData);
  };

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
                  <form onSubmit={formik.handleSubmit}>
                    <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                    <CustomTextField
                      id="name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                    <CustomTextField
                      id="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                    <CustomTextField
                      id="password"
                      name="password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                    <CustomFormLabel htmlFor="password">Password Confirm</CustomFormLabel>
                    <CustomTextField
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={formik.values.repeatPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                      helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                    />

                    <CustomFormLabel htmlFor="level">Level</CustomFormLabel>
                    <CustomSelect
                      labelId="demo-simple-select-label"
                      id="level"
                      name="level"
                      onChange={handleRegisterDataChange}
                      value={registerData.level}
                      fullWidth
                      sx={{
                        mb: 4,
                      }}
                    >
                      <MenuItem value="administrator">Administrator</MenuItem>
                      <MenuItem value="creator">Creator</MenuItem>
                      <MenuItem value="operator">Operator</MenuItem>
                    </CustomSelect>

                    <Button
                      color="secondary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                      sx={{
                        pt: '10px',
                        pb: '10px',
                      }}
                    >
                      Register
                    </Button>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Register;
