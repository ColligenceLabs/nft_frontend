import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Breadcrumbs, Button } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

const Breadcrumb = ({ subtitle, items, title, children }) => {
  return (
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
      <Grid item xs={6} sm={6} lg={4} display="flex" alignItems="flex-end">
        <Box
          sx={{
            textAlign: 'right',
            width: '100%',
          }}
        >
          {/*{children}*/}
          {/*{title.toLowerCase() === 'company' && (*/}
          {/*  <Button variant="contained">*/}
          {/*    <AddIcon />*/}
          {/*    {t('Register Company')}*/}
          {/*  </Button>*/}
          {/*)}*/}
          {/*{title.toLowerCase() === 'nfts' && <Button variant="contained">{t('NFT Mint')}</Button>}*/}
          {/*{title.toLowerCase() === 'airdrop' && (*/}
          {/*  <Button variant="contained">{t('AirDrop Mint')}</Button>*/}
          {/*)}*/}
          {/*{title.toLowerCase() === 'serials' && <Button variant="contained">{t('Create')}</Button>}*/}
          {/*{title.toLowerCase() === 'collection' && (*/}
          {/*  <Button variant="contained">{t('Create')}</Button>*/}
          {/*)}*/}
          {/*{title.toLowerCase() === 'reward' && <Button variant="contained">{t('Create')}</Button>}*/}
          <LinkButton title={title} />
        </Box>
      </Grid>
    </Grid>
  );
};

const LinkButton = ({ title }) => {
  const { t } = useTranslation();
  const [buttonProps, setButtonProps] = useState({ label: null, ulr: null });

  useEffect(() => {
    switch (title.toLowerCase()) {
      case 'company':
        setButtonProps({
          label: 'Register Company',
          url: '',
        });
        break;
      case 'nfts':
        setButtonProps({
          label: 'NFT Mint',
          url: '/nfts/mint',
        });
        break;
      case 'airdrop':
        setButtonProps({
          label: 'AirDrop Mint',
          url: '',
        });
        break;
      case 'serials':
        setButtonProps({
          label: 'Create',
          url: '',
        });
        break;
      case 'collection':
        setButtonProps({
          label: 'Create',
          url: '',
        });
        break;
      case 'reward':
        setButtonProps({
          label: 'Create',
          url: '',
        });
        break;
    }
  }, [title]);

  return (
    <>
      {buttonProps.label !== null && (
        // <Button variant="contained">
        //   <AddIcon style={{ marginRight: '5px' }} />
        //   <Link to={buttonProps.url}>{t(`${buttonProps.label}`)}</Link>
        // </Button>

        <Button variant="contained" component={Link} to={{ pathname: buttonProps.url }}>
          <AddIcon style={{ marginRight: '5px' }} />
          {t(`${buttonProps.label}`)}
          {/*<Link to={buttonProps.url}>{t(`${buttonProps.label}`)}</Link>*/}
        </Button>
      )}
    </>
  );
};
Breadcrumb.propTypes = {
  subtitle: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Breadcrumb;
