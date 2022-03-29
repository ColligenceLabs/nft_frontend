import React, { useState } from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from '../../layouts/market-layout/components/Container';
import { Alert, Box, Button, CardMedia, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import adminRegisterSchema from '../../config/schema/adminRegisterSchema';
import { RegisterForm } from './types';
import { register } from '../../services/auth.service';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import useUserInfo from '../../hooks/useUserInfo';

const UserProfileSetting = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const [errorMessage, setErrorMessage] = useState<any>();
  const [successRegister, setSuccessRegister] = useState(false);
  const { t } = useTranslation();
  const { full_name, email, description, image } = useUserInfo();
  const [avatar, setAvatar] = useState(image);
  const initialValue: RegisterForm = {
    full_name: full_name,
    email: email,
    password: '',
    repeatPassword: '',
    level: 'user',
    // image: null,
    description: description,
  };
  return (
    <MarketLayout>
      <Container>
        <Formik
          validationSchema={adminRegisterSchema}
          initialValues={initialValue}
          onSubmit={async (data: RegisterForm, { setSubmitting }) => {
            setSubmitting(true);

            const formData = new FormData();
            for (const value in data) {
              // @ts-ignore
              formData.append(value, data[value]);
            }
            formData.append('image', avatar);

            const res = await register(formData);
            console.log(res);
            if (res?.data.status === 1) {
              setErrorMessage(null);
              // navigate('/auth/login');
              setSuccessRegister(true);
            } else {
              setErrorMessage(res?.data.message);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            errors,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Typography variant={'h1'} sx={{ pl: mdDown ? '0px' : '180px' }}>
                Profile Settings
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexDirection: mdDown ? 'column' : 'rows',
                }}
              >
                <Box>
                  <CustomFormLabel htmlFor="image">{t('Image')}</CustomFormLabel>
                  <CustomTextField
                    id="image"
                    name="image"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.image == null ? '' : values.image.name}
                    // onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <Button
                          variant="contained"
                          component="label"
                          size="small"
                          style={{ marginRight: '1rem' }}
                        >
                          <DriveFileMoveOutlinedIcon fontSize="small" />
                          <input
                            id="image"
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/jpg, image/png, image/jpeg"
                            name="image"
                            onChange={(event) => {
                              console.log(typeof values.image);
                              // @ts-ignore
                              // setFieldValue('image', event.currentTarget.files[0]);
                              // @ts-ignore
                              setAvatar(event.currentTarget.files[0]);
                            }}
                          />
                        </Button>
                      ),
                    }}
                  />
                  {touched.image && errors.image && (
                    <Typography variant={'caption'} color={'red'}>
                      {errors.image}
                    </Typography>
                  )}
                  {values.image !== null && (
                    <CardMedia
                      component="img"
                      sx={{ width: '300px', mt: 3 }}
                      // image={URL.createObjectURL(values.image)}
                      image={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)}
                      alt="Live from space album cover"
                    />
                  )}
                </Box>
                <Box sx={{ flex: 0.6 }}>
                  <Box>
                    <CustomFormLabel htmlFor="full_name">Name</CustomFormLabel>
                    <CustomTextField
                      id="full_name"
                      name="full_name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.full_name}
                      onChange={handleChange}
                    />
                    {touched.full_name && errors.full_name && (
                      <Typography variant={'caption'} color={'red'}>
                        {errors.full_name}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                    <CustomTextField
                      id="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <Typography variant={'caption'} color={'red'}>
                        {errors.email}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                    <CustomTextField
                      id="password"
                      name="password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {touched.password && errors.password && (
                      <Typography variant={'caption'} color={'red'}>
                        {errors.password}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <CustomFormLabel htmlFor="password">Password Confirm</CustomFormLabel>
                    <CustomTextField
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.repeatPassword}
                      onChange={handleChange}
                    />
                    {touched.repeatPassword && errors.repeatPassword && (
                      <Typography variant={'caption'} color={'red'}>
                        {errors.repeatPassword}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <CustomFormLabel htmlFor="description">{t('Description')}</CustomFormLabel>
                    <CustomTextField
                      id="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.description}
                      onChange={handleChange}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Box>
                  <Box sx={{ mt: '10px', textAlign: 'right' }}>
                    <Button variant={'contained'}>Save</Button>
                  </Box>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </MarketLayout>
  );
};

export default UserProfileSetting;
