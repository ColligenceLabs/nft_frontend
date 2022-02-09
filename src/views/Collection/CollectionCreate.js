import React, { useState, useEffect } from 'react';
import {
  Grid,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
  Divider,
  Typography,
  Box,
  Alert,
  FormHelperText,
} from '@mui/material';
import { Formik } from 'formik';
import { styled } from '@mui/material/styles';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomSelect from '../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import CustomRadio from '../../components/forms/custom-elements/CustomRadio';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { useTranslation } from 'react-i18next';
import { getCreatorData } from '../../services/creator.service';
import {
  createCollection,
  validationCollectionCreateSchema,
} from '../../services/collections.service';

const COLLECTION_CATEGORY = [
  { value: 'other', title: 'Other' },
  { value: 'top', title: 'Top' },
  { value: 'game', title: 'Game' },
  { value: 'graffiti', title: 'Graffiti' },
];

const StyledButton = styled(Button)`
  width: 100px;
`;

const Container = styled(Paper)(({ theme }) => ({
  padding: '20px',
  borderRadius: '7px',
}));

const WarningBox = styled(Box)(({ theme }) => ({
  padding: '20px',
  borderRadius: '7px',
  border: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.error.main,
  color: theme.palette.error.main,
  margin: '20px 0px',
}));

const CollectionCreate = () => {
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState();
  const [successRegister, setSuccessRegister] = useState(false);
  const [creatorList, setCreatorList] = useState();
  const [collectionData, setCollectionData] = useState({
    name: '',
    creator: '',
    category: '',
    coverImage: '',
    type: 'KIP17',
    symbol: '',
  });

  useEffect(() => {
    const fetchCreator = async () => {
      await getCreatorData().then(({ data: { items } }) => {
        console.log(items);
        let creatorArray = items.map((item) => ({
          _id: item._id.toString(),
          full_name: item.full_name,
        }));
        setCreatorList(creatorArray);
      });
    };
    fetchCreator();
  }, [getCreatorData]);

  return (
    <PageContainer title="Collection Create" description="this is Collection Create Form page">
      <Breadcrumb title="Collection Create" subtitle="Collection Create Information" />
      <Container>
        <Formik
          validationSchema={validationCollectionCreateSchema}
          initialValues={{
            name: '',
            creator_id: '',
            image: null,
            category: [],
            contract_address: '0x37981dad0ac880c072a926dc04aa747a2289b998',
            type: 'KIP17',
            tokenUri: '',
            symbol: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            let formData = new FormData();
            for (let value in values) {
              if (['name', 'creator_id', 'image', 'contract_address'].includes(value)) {
                formData.append(value, values[value]);
              } else if (['category'].includes(value)) {
                const categories = values[value].toString().split();
                console.log(categories);
                formData.append(value, categories);
              }
            }

            await createCollection(formData)
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 1) {
                  setErrorMessage(null);
                  setSuccessRegister(true);
                } else {
                  setErrorMessage(res.data.message);
                  setSuccessRegister(false);
                }
              })
              .catch((error) => console.log(error));

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
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="name">
                    {t('Name (Smart Contract Name)')}
                  </CustomFormLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    placeholder={t('Enter name')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.name}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="creator">{t('Creator')}</CustomFormLabel>
                  <CustomSelect
                    labelId="demo-simple-select-label"
                    id="creator"
                    name="creator"
                    value={values.creator_id}
                    onChange={(event) => {
                      setFieldValue('creator_id', event.target.value);
                    }}
                    // error={touched.creator && Boolean(errors.creator)}
                    // helperText={touched.creator && errors.creator}
                    fullWidth
                    size="small"
                  >
                    {creatorList &&
                      creatorList.map((creator) => (
                        <MenuItem key={creator._id} value={creator._id}>
                          {creator.full_name}
                        </MenuItem>
                      ))}
                  </CustomSelect>
                  {touched.creator_id && errors.creator_id && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.creator_id}
                    </FormHelperText>
                  )}

                  {/*<CustomTextField*/}
                  {/*  select*/}
                  {/*  id="creator_id"*/}
                  {/*  name="creator_id"*/}
                  {/*  SelectProps={{*/}
                  {/*    value: values.creator_id,*/}
                  {/*    onChange: (event) => {*/}
                  {/*      setFieldValue('creator_id', event.target.value);*/}
                  {/*    },*/}
                  {/*  }}*/}
                  {/*  error={touched.creator_id && Boolean(errors.creator_id)}*/}
                  {/*  helperText={touched.creator_id && errors.creator_id}*/}
                  {/*  fullWidth*/}
                  {/*  size="small"*/}
                  {/*>*/}
                  {/*  <MenuItem value="">None</MenuItem>*/}
                  {/*  {creatorList &&*/}
                  {/*    creatorList.map((creator, index) => (*/}
                  {/*      <MenuItem key={index} value={creator._id}>*/}
                  {/*        {creator.full_name}*/}
                  {/*      </MenuItem>*/}
                  {/*    ))}*/}
                  {/*  /!*<MenuItem>asdf</MenuItem>*!/*/}
                  {/*</CustomTextField>*/}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="category">{t('Category')}</CustomFormLabel>
                  <CustomTextField
                    select
                    id="category"
                    name="category"
                    SelectProps={{
                      multiple: true,
                      value: values.category,
                      onChange: (event) => {
                        setFieldValue('category', event.target.value);
                      },
                      // error: touched.name && Boolean(errors.name),
                      // helperText: touched.name && errors.name,
                    }}
                    // error={touched.category && Boolean(errors.category)}
                    // helperText={touched.category && errors.category}
                    fullWidth
                    size="small"
                  >
                    {COLLECTION_CATEGORY.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                  {touched.category && errors.category && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.category}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="image">{t('Image')}</CustomFormLabel>
                  <CustomTextField
                    id="imageFiled"
                    name="imageFiled"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.image == null ? '' : values.image.name}
                    // onChange={handleChange}
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
                            onChange={(event) => {
                              setFieldValue('image', event.currentTarget.files[0]);
                            }}
                          />
                        </Button>
                      ),
                    }}
                  />
                  {touched.image && errors.image && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.image}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Divider
                    sx={{
                      mt: 5,
                      mb: 3,
                    }}
                  />
                  <Typography color="primary" variant="subtitle2">
                    {t('Smart Contract Information')}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel>{t('Type')}</CustomFormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="radio1"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <Grid container>
                      <Grid item lg={6} sm={6} xs={6}>
                        <FormControlLabel value="KIP17" control={<CustomRadio />} label="KIP17" />
                      </Grid>
                      <Grid item lg={6} sm={6} xs={6}>
                        <FormControlLabel value="KIP37" control={<CustomRadio />} label="KIP37" />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </Grid>

                {values.type === 'KIP17' && (
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <CustomFormLabel htmlFor="symbol">{t('Symbol')}</CustomFormLabel>
                    <CustomTextField
                      id="symbol"
                      name="symbol"
                      placeholder={t('Enter symbol')}
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.symbol}
                      onChange={handleChange}
                      error={touched.symbol && Boolean(errors.symbol)}
                      helperText={touched.symbol && errors.symbol}
                    />
                  </Grid>
                )}

                {values.type === 'KIP37' && (
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <CustomFormLabel htmlFor="tokenUri">{t('Token uri')}</CustomFormLabel>
                    <CustomTextField
                      id="tokenUri"
                      name="tokenUri"
                      placeholder={t('Enter token uri')}
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.tokenUri}
                      onChange={handleChange}
                      error={touched.tokenUri && Boolean(errors.tokenUri)}
                      helperText={touched.tokenUri && errors.tokenUri}
                    />
                  </Grid>
                )}

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <WarningBox>
                    <Typography color="error" variant="subtitle2">
                      {t(
                        'Note: In the middle of creating a collection it is included deploying one NFT smart contract on to the blockchain which requires a small gas fee.',
                      )}
                    </Typography>
                  </WarningBox>
                </Grid>
                {successRegister && (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Alert
                      sx={{
                        mt: 2,
                        mb: 2,
                      }}
                      variant="filled"
                      severity="success"
                    >
                      Success in Collection create.
                    </Alert>
                  </Grid>
                )}

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
                <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <StyledButton variant="outlined" size="small">
                      {t('Cancel')}
                    </StyledButton>
                    <StyledButton
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      // onClick={() => console.log('aaa')}
                    >
                      {t('Confirm')}
                    </StyledButton>
                  </div>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </PageContainer>
  );
};

export default CollectionCreate;
