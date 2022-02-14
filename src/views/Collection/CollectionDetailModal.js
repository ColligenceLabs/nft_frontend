import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import { useTranslation } from 'react-i18next';

const CollectionDetailModal = (props) => {
  const { open, closeDetailModal, row } = props;

  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={closeDetailModal}
      BackdropProps={{ style: { opacity: 0.2 }, transitionDuration: 1000 }}
    >
      <DialogTitle>{t('Collection detail')}</DialogTitle>
      <DialogContent dividers>
        <Box style={{ width: 500, marginBottom: 30 }}>
          <CustomFormLabel htmlFor="name">{t('Name (Smart Contract Name)')}</CustomFormLabel>
          <CustomTextField
            id="name"
            name="name"
            // value={row._id?.$oid}
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="creator">{t('Creator')}</CustomFormLabel>
          <CustomTextField
            id="creator"
            name="creator"
            // value={row.uid}
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="category">{t('Category')}</CustomFormLabel>
          <CustomTextField
            id="category"
            name="category"
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="category">{t('Type')}</CustomFormLabel>
          <CustomTextField
            id="type"
            name="type"
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="category">{t('Symbol')}</CustomFormLabel>
          <CustomTextField
            id="symbol"
            name="symbol"
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="category">{t('IPFS Directory Name')}</CustomFormLabel>
          <CustomTextField
            id="tokenUri"
            name="tokenUri"
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small" onClick={closeDetailModal}>
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionDetailModal;
