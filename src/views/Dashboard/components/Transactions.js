import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';

import FeatherIcon from 'feather-icons-react';

const Transactions = () => (
  <Card
    sx={{
      backgroundColor: '#ffa800',
      color: 'white',
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Typography
          variant="h3"
          sx={{
            marginBottom: '0',
          }}
          gutterBottom
        >
          Transactions
        </Typography>
        <Box
          sx={{
            marginLeft: 'auto',
          }}
        >
          <Fab
            size="small"
            color=""
            aria-label="add"
            elevation="0"
            sx={{
              boxShadow: 'none',
            }}
          >
            <FeatherIcon icon="credit-card" />
          </Fab>
        </Box>
      </Box>
      <Typography
        variant="h1"
        fontWeight="500"
        sx={{
          marginBottom: '0',
          marginTop: '15px',
        }}
        gutterBottom
      >
        47
      </Typography>
      {/*<Typography*/}
      {/*  variant="h6"*/}
      {/*  fontWeight="400"*/}
      {/*  sx={{*/}
      {/*    marginBottom: '0',*/}
      {/*    opacity: '0.6',*/}
      {/*  }}*/}
      {/*  gutterBottom*/}
      {/*>*/}
      {/*  Monthly Revenue*/}
      {/*</Typography>*/}
    </CardContent>
  </Card>
);

export default Transactions;
