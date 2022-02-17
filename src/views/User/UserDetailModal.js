import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import { useTranslation } from 'react-i18next';

const UserDetailModal = (props) => {
  const { open, closeUserDetailModal, row } = props;

  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={closeUserDetailModal}
      BackdropProps={{ style: { opacity: 0.2 }, transitionDuration: 1000 }}
    >
      <DialogTitle>{t('User detail')}</DialogTitle>
      <DialogContent dividers>
        <Box style={{ width: 500, marginBottom: 30 }}>
          <CustomFormLabel htmlFor="name">{t('User id')}</CustomFormLabel>
          <CustomTextField
            id="userId"
            name="userId"
            value={row._id}
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
          <CustomFormLabel htmlFor="name">{t('UID')}</CustomFormLabel>
          <CustomTextField
            id="uid"
            name="uid"
            value={row.uid}
            variant="outlined"
            fullWidth
            disabled
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small" onClick={closeUserDetailModal}>
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailModal;
