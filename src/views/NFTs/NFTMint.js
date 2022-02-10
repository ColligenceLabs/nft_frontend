import React, { useState } from 'react';
import { Formik } from 'formik';
import { Grid, MenuItem, Button, Paper, FormHelperText, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomSelect from '../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { useWeb3React } from '@web3-react/core';
import { useKip17Contract } from '../../hooks/useContract';
import useNFT from '../../hooks/useNFT';
import { useTranslation } from 'react-i18next';
import collectionsService, { getCollectionsByCreatorId } from '../../services/collections.service';
import contracts from '../../config/constants/contracts';
import { LoadingButton } from '@mui/lab';
import useCreator from '../../hooks/useCreator';
import nftRegisterSchema from '../../config/schema/nftMintSchema';
import { registerNFT } from '../../services/nft.service';

const Container = styled(Paper)(({ theme }) => ({
  padding: '20px',
  borderRadius: '7px',
}));

const NFTMint = () => {
  const { t } = useTranslation();
  const [mintData, setMintData] = useState({
    name: '',
    creator: '',
    category: '',
    externalURL: '',
    content: '',
    contentFile: '',
    // type: '',
    // quantity: '',
    collection: '',
    amount: '',
    thumbnail: '',
    thumbnailFile: '',
    price: '',
    description: '',
  });

  const [contract, setContract] = useState(
    // 구 버전에서 발행된 전체 NFTs
    contracts.kip17[parseInt(process.env.REACT_APP_CHAIN_ID, 10)],
  );

  //--------------- formik
  // const [creatorList, setCreatorList] = useState();
  const [collectionList, setCollectionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [successRegister, setSuccessRegister] = useState(false);
  const creatorList = useCreator();

  const getCollectionList = async (id) => {
    await getCollectionsByCreatorId(id)
      .then(({ data }) => {
        setCollectionList(data);
      })
      .catch((error) => console.log(error));
  };

  const { account } = useWeb3React();
  const kip17Contract = useKip17Contract(contract);
  const { createNFT } = useNFT(kip17Contract, account, mintData);

  return (
    <PageContainer title="NFT Mint" description="this is NFT Mint Form page">
      <Breadcrumb title="NFT Mint" subtitle="NFT Mint Information" />
      <Container>
        <Formik
          validationSchema={nftRegisterSchema}
          initialValues={{
            name: '',
            creator_id: '',
            category: '',
            collection: '',
            content: null,
            amount: '',
            thumbnail: null,
            externalURL: '',
            description: '',
            price: '',
            contract_type: '',
            auto: 'false',
            type: '0',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            let formData = new FormData();
            for (let value in values) {
              if (
                [
                  'name',
                  'price',
                  'external_url',
                  'contract_type',
                  'auto',
                  'type',
                  'description',
                ].includes(value)
              ) {
                formData.append(value, values[value]);
              }
            }
            formData.append('quantity', values['amount']);
            formData.append('collection_id', values['collection']);
            formData.append('files', values['content']);
            formData.append('files', values['thumbnail']);

            await registerNFT(formData)
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
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="name">{t('Name')}</CustomFormLabel>
                  <CustomTextField
                    id="name"
                    name="name"
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
                      setFieldValue('collection', '');
                      setFieldValue('category', '');
                      getCollectionList(event.target.value);
                    }}
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
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="collection">{t('Collection')}</CustomFormLabel>
                  <CustomSelect
                    labelId="demo-simple-select-label"
                    id="collection"
                    name="collection"
                    value={values.collection}
                    onChange={(event) => {
                      setFieldValue('collection', event.target.value);
                      console.log(event.target.value);
                      collectionList.filter((collection) =>
                        collection._id === event.target.value
                          ? setFieldValue('category', collection.category.toString())
                          : null,
                      );
                    }}
                    fullWidth
                    size="small"
                  >
                    {collectionList &&
                      collectionList.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </CustomSelect>
                  {touched.collection && errors.collection && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.collection}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="category">{t('Category')}</CustomFormLabel>
                  <CustomTextField
                    id="category"
                    name="category"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.category}
                    onChange={handleChange}
                  />
                  {touched.category && errors.category && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.category}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="content">{t('Content')}</CustomFormLabel>
                  <CustomTextField
                    id="contentFiled"
                    name="contentFiled"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.content == null ? '' : values.content.name}
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
                            id="content"
                            style={{ display: 'none' }}
                            type="file"
                            name="image"
                            onChange={(event) => {
                              setFieldValue('content', event.currentTarget.files[0]);
                            }}
                          />
                        </Button>
                      ),
                    }}
                  />
                  {touched.content && errors.content && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.content}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="amount">{t('Amount')}</CustomFormLabel>
                  <CustomTextField
                    id="amount"
                    name="amount"
                    placeholder={t('Enter amount')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.amount}
                    onChange={handleChange}
                  />
                  {touched.amount && errors.amount && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.amount}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="thumbnail">{t('Thumbnail')}</CustomFormLabel>
                  <CustomTextField
                    id="thumbnailFiled"
                    name="thumbnailFiled"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.thumbnail == null ? '' : values.thumbnail.name}
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
                            id="thumbnail"
                            style={{ display: 'none' }}
                            type="file"
                            name="image"
                            onChange={(event) => {
                              setFieldValue('thumbnail', event.currentTarget.files[0]);
                            }}
                          />
                        </Button>
                      ),
                    }}
                  />
                  {touched.thumbnail && errors.thumbnail && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.thumbnail}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="externalURL">{t('External URL')}</CustomFormLabel>
                  <CustomTextField
                    id="externalURL"
                    name="externalURL"
                    placeholder={t('Enter external URL')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.externalURL}
                    onChange={handleChange}
                  />
                  {touched.externalURL && errors.externalURL && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.externalURL}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="description">{t('Description')}</CustomFormLabel>
                  <CustomTextField
                    id="description"
                    name="description"
                    placeholder={t('Enter description')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.description}
                    onChange={handleChange}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.description}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="price">{t('Price')}</CustomFormLabel>
                  <CustomTextField
                    id="price"
                    name="price"
                    placeholder={t('Enter price')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={values.price}
                    onChange={handleChange}
                  />
                  {touched.price && errors.price && (
                    <FormHelperText htmlFor="render-select" error>
                      {errors.price}
                    </FormHelperText>
                  )}
                </Grid>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={successRegister}
                  autoHideDuration={2000}
                  onClose={() => {
                    setSuccessRegister(false);
                    resetForm();
                  }}
                >
                  <Alert
                    onClose={() => {
                      setSuccessRegister(false);
                      resetForm();
                    }}
                    variant="filled"
                    severity="success"
                    sx={{ width: '100%' }}
                  >
                    Success in Collection nfts!
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
                <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">
                  {/*<div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>*/}
                  {/*  <StyledButton variant="outlined" size="small">*/}
                  {/*    {t('Cancel')}*/}
                  {/*  </StyledButton>*/}
                  {/*  <StyledButton variant="contained" onClick={createNFT}>*/}
                  {/*    {t('Confirm')}*/}
                  {/*  </StyledButton>*/}
                  {/*</div>*/}
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    {t('Confirm')}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </PageContainer>
  );
};

export default NFTMint;
