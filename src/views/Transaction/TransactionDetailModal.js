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

const TransactionDetailModal = (props) => {
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
          <DialogTitle>{t('Transaction detail')}</DialogTitle>
          <DialogContent dividers>
            <Box style={{ width: 500, marginBottom: 30 }}>
              <CustomFormLabel htmlFor="seller">{t('Seller')}</CustomFormLabel>
              <CustomTextField
                id="seller"
                name="seller"
                variant="outlined"
                fullWidth
                disabled
                size="small"
                value={row.seller.admin_address}
              />
              <CustomFormLabel htmlFor="buyer">{t('Buyer')}</CustomFormLabel>
              <CustomTextField
                id="buyer"
                name="buyer"
                variant="outlined"
                fullWidth
                disabled
                size="small"
                value={row.buyer}
              />
              <CustomFormLabel htmlFor="tokenId">{t('Token ID')}</CustomFormLabel>
              <CustomTextField
                id="tokenId"
                name="tokenId"
                variant="outlined"
                fullWidth
                disabled
                size="small"
                value={'tokernID'}
              />
              {/*<CustomFormLabel htmlFor="transactionId">{t('Transaction ID')}</CustomFormLabel>*/}
              {/*<CustomTextField*/}
              {/*  id="transactionId"*/}
              {/*  name="transactionId"*/}
              {/*  variant="outlined"*/}
              {/*  fullWidth*/}
              {/*  disabled*/}
              {/*  size="small"*/}
              {/*  value={row.tx_id}*/}
              {/*/>*/}
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

export default TransactionDetailModal;
