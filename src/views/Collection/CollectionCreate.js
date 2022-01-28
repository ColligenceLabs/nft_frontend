import React, { useState } from 'react';
import { Grid, MenuItem, RadioGroup, FormControlLabel, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomSelect from '../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import CustomRadio from '../../components/forms/custom-elements/CustomRadio';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { useTranslation } from 'react-i18next';

const StyledButton = styled(Button)`
  width: 100px;
`;

const Container = styled(Paper)(({ theme }) => ({
  padding: '20px',
  borderRadius: '7px',
}));

const CollectionCreate = () => {
  const { t } = useTranslation();
  const [collectionData, setCollectionData] = useState({
    name: '',
    creator: '',
    category: '',
    coverImage: '',
    type: '',
    quantity: '',
    contractName: '',
    symbol: '',
  });
  const [selectedCoverImage, setSelectedCoverImage] = useState();
  const [creator, setCreator] = useState(0);
  const [type, setType] = useState('KIP17');

  const contentFileHandler = (event) => {
    setSelectedCoverImage(event.target.files[0]);
    setCollectionData({
      ...collectionData,
      coverImage: event.target.files[0].name,
      contentFile: event.target.files[0],
    });
  };

  const handleCollectionDataChange = (event) => {
    const { name, value } = event.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };
  const handleCreatorChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
    setCreator(event.target.value);
  };

  const handleTypeChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
    setType(event.target.value);
  };

  return (
    <PageContainer title="Collection Create" description="this is Collection Create Form page">
      <Breadcrumb title="Collection Create" subtitle="Collection Create Information" />
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
              onChange={handleCollectionDataChange}
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
              onChange={handleCollectionDataChange}
            />
          </Grid>

          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="coverImage">{t('Cover Image')}</CustomFormLabel>
            <CustomTextField
              id="coverImage"
              name="coverImage"
              placeholder={t('Select File')}
              variant="outlined"
              fullWidth
              size="small"
              value={collectionData.coverImage}
              onChange={handleCollectionDataChange}
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

          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={4} sm={4} xs={12}>
                <CustomFormLabel>{t('Type')}</CustomFormLabel>
                <RadioGroup
                  aria-label="gender"
                  defaultValue="radio1"
                  name="type"
                  value={type}
                  onChange={handleTypeChange}
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
              <Grid item lg={8} sm={8} xs={12}>
                <CustomFormLabel htmlFor="quantity">{t('Quantity')}</CustomFormLabel>
                <CustomTextField
                  id="quantity"
                  name="quantity"
                  placeholder={t('Enter quantity')}
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={handleCollectionDataChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="contractName">{t('Contract Name')}</CustomFormLabel>
            <CustomTextField
              id="contractName"
              name="contractName"
              placeholder={t('Enter contract name')}
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleCollectionDataChange}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="symbol">{t('Symbol')}</CustomFormLabel>
            <CustomTextField
              id="symbol"
              name="symbol"
              placeholder={t('Enter symbol')}
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleCollectionDataChange}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <StyledButton variant="outlined" size="small">
                {t('Cancel')}
              </StyledButton>
              <StyledButton variant="contained" onClick={() => console.log()}>
                {t('Confirm')}
              </StyledButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default CollectionCreate;
