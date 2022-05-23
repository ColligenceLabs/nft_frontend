import React, { useState, useEffect } from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from '../../layouts/market-layout/components/Container';
import { Alert, Box, Button, Grid, Snackbar, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { RegisterForm } from './types';
import { updater } from '../../services/market.service';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import useUserInfo from '../../hooks/useUserInfo';
import CustomTextarea from '../../components/forms/custom-elements/CustomTextarea';
import { LoadingButton } from '@mui/lab';
import adminUpdateSchema from '../../config/schema/adminUpdateSchema';
import { useNavigate } from 'react-router';
import defaultUserImage from '../../assets/images/users/user.png';
import defaultBannerImage from '../../assets/images/users/banner.png.png';
import { loginWithAddress } from '../../redux/slices/auth';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';

const UserProfileSetting = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, account, library } = context;
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const [errorMessage, setErrorMessage] = useState<any>();
  const [successRegister, setSuccessRegister] = useState(false);
  const { t } = useTranslation();
  const { full_name, email, description, image: userImage, id, banner } = useUserInfo();
  console.log(full_name, email, description, userImage, id);
  const [userInfo, setUserInfo] = useState<RegisterForm>({});
  console.log(userInfo);

  useEffect(() => {
    setUserInfo({
      id: id,
      full_name,
      image: userImage === null ? '' : userImage,
      imageSrc: userImage === null ? defaultUserImage : userImage,
      description,
      email,
      password: '',
      repeatPassword: '',
      level: 'user',
    });
  }, [full_name, email, description, userImage, id]);

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setUserInfo({ ...userInfo, imageSrc: reader.result });
        resolve();
      };
    });
  };
  // @ts-ignore
  return (
    <MarketLayout>
      <Container>
        {id && (
          <Formik
            validationSchema={adminUpdateSchema}
            initialValues={{
              id: id,
              full_name: full_name,
              image: '',
              imageSrc: userImage,
              description: description,
              email: email,
              password: '',
              repeatPassword: '',
              level: '',
            }}
            onSubmit={async (data: RegisterForm, { setSubmitting }) => {
              setSubmitting(true);

              const formData = new FormData();

              formData.append('id', data.id!);
              formData.append('name', data.full_name!);
              formData.append('image', data.image!);
              formData.append('email', data.email!);
              formData.append('description', data.description);

              const res = await updater(formData);

              if (res.data.status === 1) {
                // localStorage.setItem('user', JSON.stringify(res.data || null));
                dispatch(loginWithAddress({ address: account, chainId: '1001' }));
                setErrorMessage(null);
                setSuccessRegister(true);
              } else {
                setErrorMessage(res.data.message);
                setSuccessRegister(false);
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
                      id="imageFiled"
                      name="imageFiled"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.image!.name || ''}
                      InputProps={{
                        startAdornment: (
                          <Button
                            component="label"
                            variant="contained"
                            size="small"
                            style={{ marginRight: '1rem' }}
                          >
                            <DriveFileMoveOutlinedIcon fontSize="small" />
                            <input
                              id="image"
                              style={{ display: 'none' }}
                              type="file"
                              name="image"
                              onChange={(event: React.ChangeEvent<HTMLInputElement | null>) => {
                                setFieldValue('image', event!.currentTarget!.files[0]);
                                encodeFileToBase64(event.currentTarget.files[0]);
                              }}
                            />
                          </Button>
                        ),
                      }}
                    />
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <img
                        src={userInfo.imageSrc}
                        alt="logo"
                        style={{
                          objectFit: 'cover',
                          width: '200px',
                          height: '200px',
                          borderRadius: '50%',
                          marginTop: '20px',
                        }}
                      />
                    </Box>
                    {touched.image && errors.image && (
                      <Typography variant={'caption'} color={'red'}>
                        {errors.image}
                      </Typography>
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
                        value={values.email || ''}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <Typography variant={'caption'} color={'red'}>
                          {errors.email}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <CustomFormLabel htmlFor="description">{t('Description')}</CustomFormLabel>
                      <CustomTextarea
                        maxRows={5}
                        minRows={5}
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      {touched.description && errors.description && (
                        <Typography variant={'caption'} color={'red'}>
                          {errors.description}
                        </Typography>
                      )}
                    </Box>
                    <Snackbar
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      open={successRegister}
                      autoHideDuration={1000}
                      onClose={() => {
                        navigate('/market/profile');
                        setSuccessRegister(false);
                      }}
                    >
                      <Alert
                        onClose={() => {
                          setSuccessRegister(false);
                        }}
                        variant="filled"
                        severity="success"
                        sx={{ width: '100%' }}
                      >
                        Success Update!
                      </Alert>
                    </Snackbar>

                    {errorMessage && (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Alert
                          sx={{
                            mt: 2,
                            mb: 2,
                          }}
                          variant="filled"
                          severity="error"
                        >
                          {errorMessage}
                        </Alert>
                      </Grid>
                    )}
                    <Box sx={{ mt: '10px', textAlign: 'right' }}>
                      <LoadingButton type="submit" loading={isSubmitting} variant="contained">
                        {t('Confirm')}
                      </LoadingButton>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Container>
    </MarketLayout>
  );
};

export default UserProfileSetting;
