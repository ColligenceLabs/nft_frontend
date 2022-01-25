import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Link, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Breadcrumb = ({ subtitle, items, title, children }) => (
  <Grid
    container
    sx={{
      p: '15px',
    }}
  >
    <Grid item xs={6} sm={6} lg={8}>
      <Typography color="textSecondary" fontWeight="400" variant="h4">
        {subtitle}
      </Typography>

      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="none" color="inherit" component={NavLink} to={item.to}>
                    {item.title}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
          : ''}
      </Breadcrumbs>
      <Typography
        fontWeight="700"
        variant="h1"
        sx={{
          lineHeight: '1.235',
        }}
      >
        {title}
      </Typography>
    </Grid>
    <Grid
      item
      xs={6}
      sm={6}
      lg={4}
      display="flex"
      alignItems="flex-end"
      style={{ border: '1px solid red' }}
    >
      <Box
        sx={{
          // display: { xs: 'none', md: 'flex', lg: 'flex' },
          // alignItems: 'center',
          // justifyContent: 'flex-end',
          textAlign: 'right',
          width: '100%',
        }}
      >
        {children}
        <Button variant="contained">asdf</Button>
      </Box>
    </Grid>
  </Grid>
);

Breadcrumb.propTypes = {
  subtitle: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Breadcrumb;
