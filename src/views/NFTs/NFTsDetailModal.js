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
  Typography,
} from '@mui/material';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';
import BlurredUpImage from '../../components/BlurredUpImage';

const NFTsDetailModal = (props) => {
  const theme = useTheme();
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
          <DialogTitle style={{ background: `${theme.palette.primary.main}` }}>
            <Typography variant="title" color="white">
              {t('NFT detail')}
            </Typography>
          </DialogTitle>
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
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="description">{t('Description')}</CustomFormLabel>
                  <CustomTextField
                    id="description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    disabled
                    size="small"
                    value={row.metadata.description}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="price">{t('Price')}</CustomFormLabel>
                  <CustomTextField
                    id="price"
                    name="price"
                    variant="outlined"
                    type="number"
                    fullWidth
                    disabled
                    size="small"
                    value={row.price}
                  />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="content">{t('Content')}</CustomFormLabel>
                  <BlurredUpImage image={row.metadata.image} />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel htmlFor="thumbnail">{t('Thumbnail')}</CustomFormLabel>
                  <BlurredUpImage image={row.metadata.thumbnail} />
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

export default NFTsDetailModal;
