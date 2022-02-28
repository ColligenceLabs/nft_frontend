import React from 'react';
import { Button } from '@mui/material';

const Solana = () => {
  const onClick = () => {
    console.log('clicked');
  };

  return (
    <div>
      <Button variant="contained" onClick={onClick}>
        Text
      </Button>
    </div>
  );
};

export default Solana;
