import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const CollectionDetailModal = (props) => {
  const theme = useTheme();
  const { open, closeDetailModal, row } = props;
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={closeDetailModal}
      BackdropProps={{ style: { opacity: 0.2 }, transitionDuration: 1000 }}
    >
      <DialogTitle style={{ background: `${theme.palette.primary.main}` }}>
        <Typography variant="title" color="white">
          {t('Collection detail')}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box style={{ width: 500, marginBottom: 30 }}>
          <CustomFormLabel htmlFor="name">{t('Name (Smart Contract Name)')}</CustomFormLabel>
          <CustomTextField
            id="name"
            name="name"
            value={row.name}
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="creator">{t('Creator')}</CustomFormLabel>
          <CustomTextField
            id="creator"
            name="creator"
            value={row.creator_name}
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="category">{t('Category')}</CustomFormLabel>
          <CustomTextField
            id="category"
            name="category"
            value={row.category}
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
            value={row.contract_type}
            fullWidth
            disabled
            size="small"
          />
          {/*{row.contract_type && row.contract_type.toLowerCase() === 'kip17' ? (*/}
          {/*  <>*/}
          {/*    <CustomFormLabel htmlFor="category">{t('Symbol')}</CustomFormLabel>*/}
          {/*    <CustomTextField*/}
          {/*      id="symbol"*/}
          {/*      name="symbol"*/}
          {/*      variant="outlined"*/}
          {/*      fullWidth*/}
          {/*      disabled*/}
          {/*      size="small"*/}
          {/*    />*/}
          {/*  </>*/}
          {/*) : (*/}
          {/*  <>*/}
          {/*    <CustomFormLabel htmlFor="category">{t('IPFS Directory Name')}</CustomFormLabel>*/}
          {/*    <CustomTextField*/}
          {/*      id="tokenUri"*/}
          {/*      name="tokenUri"*/}
          {/*      variant="outlined"*/}
          {/*      fullWidth*/}
          {/*      disabled*/}
          {/*      size="small"*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
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
