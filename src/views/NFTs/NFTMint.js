import React, { useState } from 'react';
import { Grid, MenuItem, Button, Paper } from '@mui/material';
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

const StyledButton = styled(Button)`
  width: 100px;
`;

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
  const [selectedContent, setSelectedContent] = useState();
  const [selectedThumbnail, setSelectedThumbnail] = useState();

  const [creator, setCreator] = useState(0);
  const [collection, setCollection] = useState(0);

  const [type, setType] = useState('KIP17');

  const contentFileHandler = (event) => {
    setSelectedContent(event.target.files[0]);
    setMintData({
      ...mintData,
      content: event.target.files[0].name,
      contentFile: event.target.files[0],
    });
  };

  const thumbnailFileHandler = (event) => {
    setSelectedThumbnail(event.target.files[0]);
    setMintData({
      ...mintData,
      thumbnail: event.target.files[0].name,
      thumbnailFile: event.target.files[0],
    });
  };

  const handleMintDataChange = (event) => {
    const { name, value } = event.target;
    setMintData({
      ...mintData,
      [name]: value,
    });
  };
  const handleCreatorChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setMintData({
      ...mintData,
      [name]: value,
    });
    setCreator(event.target.value);
  };

  const handleCollectionChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setMintData({
      ...mintData,
      [name]: value,
    });
    setCollection(event.target.value);
  };

  const handleTypeChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    setMintData({
      ...mintData,
      [name]: value,
    });
    setType(event.target.value);
  };

  const { account } = useWeb3React();
  const kip17Contract = useKip17Contract();
  const { createNFT } = useNFT(kip17Contract, account, mintData);

  return (
    <PageContainer title="NFT Mint" description="this is NFT Mint Form page">
      <Breadcrumb title="NFT Mint" subtitle="NFT Mint Information" />
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="name">{t('Name')}</CustomFormLabel>
            <CustomTextField
              id="name"
              name="name"
              placeholder={t('Enter name')}
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleMintDataChange}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="creator">{t('Creator')}</CustomFormLabel>
            <CustomSelect
              labelId="demo-simple-select-label"
              id="creator"
              name="creator"
              value={creator}
              onChange={handleCreatorChange}
              fullWidth
              size="small"
            >
              <MenuItem value={0}>{t('Select Creator')}</MenuItem>
              <MenuItem value={1}>Own</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </CustomSelect>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="category">{t('Category')}</CustomFormLabel>
            <CustomTextField
              id="category"
              name="category"
              placeholder={t('Enter category')}
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleMintDataChange}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="collection">{t('Collection')}</CustomFormLabel>
            <CustomSelect
              labelId="demo-simple-select-label"
              id="collection"
              name="collection"
              value={collection}
              onChange={handleCollectionChange}
              fullWidth
              size="small"
            >
              <MenuItem value={0}>{t('Select Collection')}</MenuItem>
              <MenuItem value={1}>Own</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </CustomSelect>
          </Grid>

          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="content">{t('Content')}</CustomFormLabel>
            <CustomTextField
              id="content"
              name="content"
              placeholder={t('Select File')}
              variant="outlined"
              fullWidth
              size="small"
              value={mintData.content}
              onChange={handleMintDataChange}
              InputProps={{
                startAdornment: (
                  <Button
                    variant="contained"
                    component="label"
                    variant="contained"
                    size="small"
                    style={{ marginRight: '1rem' }}
                  >
                    <DriveFileMoveOutlinedIcon fontSize="small" />
                    <input
                      id={'file-input'}
                      style={{ display: 'none' }}
                      type="file"
                      name="imageFile"
                      onChange={contentFileHandler}
                    />
                  </Button>
                ),
              }}
            />
          </Grid>
          {/*<Grid item lg={6} md={12} sm={12} xs={12}>*/}
          {/*  <Grid container spacing={2}>*/}
          {/*    <Grid item lg={4} sm={4} xs={12}>*/}
          {/*      <CustomFormLabel>Type</CustomFormLabel>*/}
          {/*      <RadioGroup*/}
          {/*        aria-label="gender"*/}
          {/*        defaultValue="radio1"*/}
          {/*        name="type"*/}
          {/*        value={type}*/}
          {/*        onChange={handleTypeChange}*/}
          {/*      >*/}
          {/*        <Grid container>*/}
          {/*          <Grid item lg={6} sm={6} xs={6}>*/}
          {/*            <FormControlLabel value="KIP17" control={<CustomRadio />} label="KIP17" />*/}
          {/*          </Grid>*/}
          {/*          <Grid item lg={6} sm={6} xs={6}>*/}
          {/*            <FormControlLabel value="KIP37" control={<CustomRadio />} label="KIP37" />*/}
          {/*          </Grid>*/}
          {/*        </Grid>*/}
          {/*      </RadioGroup>*/}
          {/*    </Grid>*/}
          {/*    <Grid item lg={8} sm={8} xs={12}>*/}
          {/*      <CustomFormLabel htmlFor="quantity">Quantity</CustomFormLabel>*/}
          {/*      <CustomTextField*/}
          {/*        id="quantity"*/}
          {/*        name="quantity"*/}
          {/*        placeholder="Enter Quantity"*/}
          {/*        variant="outlined"*/}
          {/*        fullWidth*/}
          {/*        size="small"*/}
          {/*        onChange={handleMintDataChange}*/}
          {/*      />*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="amount">{t('Amount')}</CustomFormLabel>
            <CustomTextField
              id="amount"
              name="amount"
              placeholder={t('Enter amount')}
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleMintDataChange}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="thumbnail">{t('Thumbnail')}</CustomFormLabel>
            <CustomTextField
              id="thumbnail"
              name="thumbnail"
              value={mintData.thumbnail}
              placeholder={t('Select File')}
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleMintDataChange}
              InputProps={{
                startAdornment: (
                  <Button
                    variant="contained"
                    component="label"
                    variant="contained"
                    size="small"
                    style={{ marginRight: '1rem' }}
                  >
                    <DriveFileMoveOutlinedIcon fontSize="small" />
                    <input
                      id={'file-input'}
                      style={{ display: 'none' }}
                      type="file"
                      name="imageFile"
                      onChange={thumbnailFileHandler}
                    />
                  </Button>
                ),
              }}
            />
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
              onChange={handleMintDataChange}
            />
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
              onChange={handleMintDataChange}
            />
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
              onChange={handleMintDataChange}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <StyledButton variant="outlined" size="small">
                {t('Cancel')}
              </StyledButton>
              <StyledButton variant="contained" onClick={createNFT}>
                {t('Confirm')}
              </StyledButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default NFTMint;
