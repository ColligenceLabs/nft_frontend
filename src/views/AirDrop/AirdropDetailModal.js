import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CardMedia,
} from '@mui/material';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import { useTranslation } from 'react-i18next';

const AirdropDetailModal = (props) => {
  const { open, handleCloseDetailModal, row } = props;
  const { t } = useTranslation();
  return (
    <>
      {row._id && (
        <Dialog
          open={open}
          onClose={handleCloseDetailModal}
          BackdropProps={{ style: { opacity: 0.2 }, transitionDuration: 1000 }}
          maxWidth="md"
        >
          <DialogTitle>{t('AirDrop detail')}</DialogTitle>
          <DialogContent dividers>
            <Box>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="name">{t('Name')}</CustomFormLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    disabled
                    value={row.metadata.name}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="creator">{t('Creator')}</CustomFormLabel>
                  <CustomTextField
                    id="creator"
                    name="creator"
                    disabled
                    fullWidth
                    size="small"
                    value={row.creator_id.full_name}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="collection">{t('Collection')}</CustomFormLabel>
                  <CustomTextField
                    id="collection"
                    name="collection"
                    fullWidth
                    size="small"
                    disabled
                    value={row.collection_id.name}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="category">{t('Category')}</CustomFormLabel>
                  <CustomTextField
                    id="category"
                    name="category"
                    variant="outlined"
                    fullWidth
                    size="small"
                    disabled
                    value={row.collection_id.category}
                  />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="amount">{t('Amount')}</CustomFormLabel>
                  <CustomTextField
                    id="amount"
                    name="amount"
                    type="number"
                    variant="outlined"
                    fullWidth
                    size="small"
                    disabled
                    value={row.quantity}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="externalURL">{t('External URL')}</CustomFormLabel>
                  <CustomTextField
                    id="externalURL"
                    name="externalURL"
                    variant="outlined"
                    fullWidth
                    disabled
                    size="small"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <CustomFormLabel htmlFor="description">{t('Description')}</CustomFormLabel>
                    <CustomTextField
                      id="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      size="small"
                      disabled
                      value={row.metadata.description}
                    />
                  </Grid>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="content">{t('Content')}</CustomFormLabel>
                  <img
                    src={row.metadata.image}
                    style={{ width: '100%', height: 'auto' }}
                    alt={row.metadata.name}
                  />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="thumbnail">{t('Thumbnail')}</CustomFormLabel>
                  <CardMedia
                    component="img"
                    image={row.metadata.thumbnail}
                    alt={row.metadata.name}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" size="small" onClick={handleCloseDetailModal}>
              {t('Close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AirdropDetailModal;
