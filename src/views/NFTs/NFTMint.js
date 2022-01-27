import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomSelect from '../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import CustomRadio from '../../components/forms/custom-elements/CustomRadio';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import { useWeb3React } from '@web3-react/core';
import { useKip17Contract } from '../../hooks/useContract';
import { rows } from './data';
import useNFT from '../../hooks/useNFT';

const StyledButton = styled(Button)`
  width: 100px;
`;

const NFTMint = () => {
  const [mintData, setMintData] = useState({
    name: '',
    company: '',
    category: '',
    externalURL: '',
    content: '',
    contentFile: '',
    type: '',
    quantity: '',
    thumbnail: '',
    thumbnailFile: '',
    price: '',
    description: '',
  });
  const [selectedContent, setSelectedContent] = useState();
  const [selectedThumbnail, setSelectedThumbnail] = useState();

  const [company, setCompany] = useState(0);
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
  const handleCompanyChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setMintData({
      ...mintData,
      [name]: value,
    });
    setCompany(event.target.value);
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
      {/* breadcrumb */}
      <Breadcrumb title="NFT Mint" subtitle="NFT Mint Information" />
      {/* end breadcrumb */}

      <Card>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                id="name"
                name="name"
                placeholder="Enter name"
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleMintDataChange}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel htmlFor="company">Company</CustomFormLabel>
              <CustomSelect
                labelId="demo-simple-select-label"
                id="company"
                name="company"
                value={company}
                onChange={handleCompanyChange}
                fullWidth
                size="small"
              >
                <MenuItem value={0}>Select Company</MenuItem>
                <MenuItem value={1}>Own</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
              </CustomSelect>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel htmlFor="category">Category</CustomFormLabel>
              <CustomTextField
                id="category"
                name="category"
                placeholder="Enter Category"
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleMintDataChange}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel htmlFor="externalURL">External URL</CustomFormLabel>
              <CustomTextField
                id="externalURL"
                name="externalURL"
                placeholder="External URL"
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleMintDataChange}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel htmlFor="content">Content</CustomFormLabel>
              <CustomTextField
                id="content"
                name="content"
                placeholder="Select File"
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
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={4} sm={4} xs={12}>
                  <CustomFormLabel>Type</CustomFormLabel>
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
                  <CustomFormLabel htmlFor="quantity">Quantity</CustomFormLabel>
                  <CustomTextField
                    id="quantity"
                    name="quantity"
                    placeholder="Enter Quantity"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={handleMintDataChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel htmlFor="thumbnail">Thumbnail</CustomFormLabel>
              <CustomTextField
                id="thumbnail"
                name="thumbnail"
                value={mintData.thumbnail}
                placeholder="Select File"
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
              <CustomFormLabel htmlFor="price">Price</CustomFormLabel>
              <CustomTextField
                id="price"
                name="price"
                placeholder="Enter Price"
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleMintDataChange}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel htmlFor="description">Description</CustomFormLabel>
              <CustomTextField
                id="description"
                name="description"
                placeholder="Enter Description"
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleMintDataChange}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <StyledButton variant="outlined" size="small">
                  Cancel
                </StyledButton>
                <StyledButton variant="contained" onClick={createNFT}>
                  Confirm
                </StyledButton>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default NFTMint;
