import React, { useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PropTypes from 'prop-types';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useTranslation } from 'react-i18next';
import FiltersDrawer from '../FiltersDrawer';
import AddIcon from '@mui/icons-material/Add';

const EnhancedTableToolbar = (props) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { numSelected, setFilters, onDelete, addSchedule, openSchedule } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    setCurrentRoute(location.pathname.replace('/', ''));
  }, [location]);

  const handleDelete = (popupState) => {};

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {['nfts', 'airdrop'].includes(currentRoute) ? (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button disabled={numSelected === 0} variant="outlined" {...bindTrigger(popupState)}>
                {`${numSelected} item(s) selected`} <ArrowDropDownOutlinedIcon sx={{ ml: 1 }} />
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    popupState.close();
                    openSchedule();
                  }}
                >
                  Sale Schedule
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    popupState.close();
                    onDelete();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      ) : (
        <Button disabled={numSelected === 0} variant="outlined">
          {`Delete ${numSelected} item(s) selected`}
        </Button>
      )}
      <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button sx={{ mr: 1 }} variant="outlined" onClick={() => setShowDrawer(true)}>
          <FilterAltOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          Filters
        </Button>
        <FiltersDrawer
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          setFilters={setFilters}
          currentRoute={currentRoute}
        />
        <LinkButton
          sx={{ mr: 1 }}
          variant="outlined"
          title={currentRoute}
          onClick={() => setShowDrawer(true)}
        >
          <FilterAltOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          Filters
        </LinkButton>
      </Box>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const LinkButton = ({ title }) => {
  const { t } = useTranslation();
  const [buttonProps, setButtonProps] = useState({ label: null, ulr: null });

  useEffect(() => {
    switch (title.toLowerCase()) {
      case 'creator':
        setButtonProps({
          label: 'Register Creator',
          url: '/creator/register',
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
          url: '/airdrop/mint',
        });
        break;
      case 'serials':
        setButtonProps({
          label: 'Create',
          url: '/serials/create',
        });
        break;
      case 'collection':
        setButtonProps({
          label: 'Create',
          url: '/collection/create',
        });
        break;
      case 'reward':
        setButtonProps({
          label: 'Create',
          url: '/reward/create',
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
        </Button>
      )}
    </>
  );
};

export default EnhancedTableToolbar;
