import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Box,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useTheme } from '@mui/styles';
import CustomTextField from '../../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../../components/forms/custom-elements/CustomFormLabel';
import CustomSelect from '../../../../components/forms/custom-elements/CustomSelect';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { NFTType } from '../../types';

interface OfferInfo {
  quantity: string;
  quote: string;
  amount: string;
  expiration: Date;
}

interface OfferDialogProps {
  open: boolean;
  handleCloseOffer: () => void;
  nft: NFTType;
}

const OfferDialog: React.FC<OfferDialogProps> = ({ open, handleCloseOffer, nft }) => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState('');
  const [quote, setQuote] = useState('');
  const [amount, setAmount] = useState('');
  const [expiration, setExpiration] = useState(new Date());
  const [agree, setAgree] = useState(false);

  const makeOffer = () => {
    console.log(`quantity: ${quantity}`);
    console.log(`quote: ${quote}`);
    console.log(`amount: ${amount}`);
    console.log(`expiration: ${expiration}`);

    // handleCloseModal();
  };
  useEffect(() => {
    setQuote(nft.quote);
  }, [nft]);
  return (
    <Dialog open={open} maxWidth={'sm'} fullWidth>
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', fontWeight: '700' }}>
        Make an Offer
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <CustomFormLabel htmlFor="quantity">Amount</CustomFormLabel>
            <CustomTextField
              id="quantity"
              name="quantity"
              type="number"
              variant="outlined"
              fullWidth
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            <Box>
              <CustomFormLabel htmlFor="quote">Offer amount</CustomFormLabel>
              <CustomSelect
                labelId="demo-simple-select-label"
                id="quote"
                name="quote"
                value={quote}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuote(e.target.value)}
                sx={{ width: '120px' }}
              >
                <MenuItem key={quote} value={quote}>
                  {quote.toUpperCase()}
                </MenuItem>
              </CustomSelect>
            </Box>
            <Box sx={{ width: '100%' }}>
              <CustomFormLabel htmlFor="amount" />
              <CustomTextField
                id="amount"
                name="amount"
                type="number"
                variant="outlined"
                fullWidth
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              <CustomFormLabel htmlFor="expiration">Offer expiration</CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  // label="Offer expiration"
                  value={expiration}
                  onChange={(value) => setExpiration(value!)}
                  inputFormat={'yyyy-MM-dd HH:mm'}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              value={agree}
              onChange={() => {
                setAgree((curr) => !curr);
              }}
            />
            <Typography variant="h6" sx={{ marginRight: '20px' }}>
              I agree ......
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant={'outlined'} onClick={handleCloseOffer}>
          Close
        </Button>
        <Button variant={'contained'} onClick={makeOffer} autoFocus>
          Make Offer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OfferDialog;
