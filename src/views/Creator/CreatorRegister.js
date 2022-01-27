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

const StyledButton = styled(Button)`
  width: 100px;
`;

const CreatorRegister = () => {
  const [creatorData, setCreatorData] = useState({
    name: '',
    content: '',
    description: '',
  });

  const [selectedContent, setSelectedContent] = useState();

  const contentFileHandler = (event) => {
    setSelectedContent(event.target.files[0]);
    setCreatorData({
      ...creatorData,
      content: event.target.files[0].name,
    });
  };

  const handleMintDataChange = (event) => {
    const { name, value } = event.target;

    setCreatorData({
      ...creatorData,
      [name]: value,
    });
  };
  const handleCreatorChange = (event) => {
    const { name, value } = event.target;
    setCreatorData({
      ...creatorData,
      [name]: value,
    });
    setCreator(event.target.value);
  };

  const handleTypeChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    setCreatorData({
      ...creatorData,
      [name]: value,
    });
    setType(event.target.value);
  };

  const onSubmitData = () => {
    console.log(creatorData);
  };

  return (
    <PageContainer title="Creator Register" description="this is Creator Register Form page">
      {/* breadcrumb */}
      <Breadcrumb title="Creator Register" subtitle="Creator Register Information" />
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
              <CustomFormLabel htmlFor="content">Content</CustomFormLabel>
              <CustomTextField
                id="content"
                name="content"
                placeholder="Select File"
                variant="outlined"
                fullWidth
                size="small"
                value={creatorData.content}
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
                <StyledButton variant="contained" onClick={onSubmitData}>
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

export default CreatorRegister;
