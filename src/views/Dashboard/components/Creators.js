import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';

import FeatherIcon from 'feather-icons-react';

const Creators = () => (
  <Card
    sx={{
      backgroundColor: '#f64e60',
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
          Creators
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
            <FeatherIcon icon="video" />
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
        21
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

export default Creators;
