import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomSelect from '../../components/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import CustomRadio from '../../components/forms/custom-elements/CustomRadio';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';

const StyledButton = styled(Button)`
  width: 100px;
`;

const Container = styled(Paper)(({ theme }) => ({
  padding: '20px',
  borderRadius: '7px',
}));

const SerialsCreate = () => {
  const [nft, setNft] = useState(0);
  const [serialsData, setSerialsData] = useState({
    nftName: '',
    quantity: '',
  });

  const handleSerialsDataChange = (event) => {
    const { name, value } = event.target;
    setMintData({
      ...mintData,
      [name]: value,
    });
  };

  const handleNFTChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setSerialsData({
      ...serialsData,
      [name]: value,
    });
    setNft(event.target.value);
  };

  const onSubmitData = () => {
    console.log(creatorData);
  };

  return (
    <PageContainer title="Serials Register" description="this is Serials Register Form page">
      <Breadcrumb title="Serials Register" subtitle="Serials Register Information" />
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="nftName">NFT Name</CustomFormLabel>
            <CustomSelect
              labelId="demo-simple-select-label"
              id="nftName"
              name="nftName"
              value={nft}
              onChange={handleNFTChange}
              fullWidth
              size="small"
            >
              <MenuItem value={0}>Select Creator</MenuItem>
              <MenuItem value={1}>Own</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </CustomSelect>
          </Grid>

          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
            <CustomTextField
              id="name"
              name="name"
              placeholder="Enter name"
              variant="outlined"
              fullWidth
              size="small"
              onChange={handleSerialsDataChange}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem" marginTop="2rem">
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <StyledButton variant="outlined" size="small">
                Cancel
              </StyledButton>
              <StyledButton variant="contained" onClick={onSubmitData}>
                Confirm
              </StyledButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default SerialsCreate;
