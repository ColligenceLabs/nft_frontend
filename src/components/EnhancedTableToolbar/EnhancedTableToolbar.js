import React, { useState } from 'react';
import { Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';
import FiltersDrawer from '../FiltersDrawer';

const EnhancedTableToolbar = (props) => {
  const { t } = useTranslation();
  const { numSelected, setFilters } = props;
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {numSelected > 0 ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography color="inherit" variant="subtitle2" component="div">
            {numSelected} {t('selected')}
          </Typography>
          <Tooltip title="Delete">
            <IconButton>
              <FeatherIcon icon="trash-2" width="18" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div" marginRight="5px">
          {t('Filter')}
        </Typography>
      )}
      <Button sx={{ mr: 1 }} variant="contained" onClick={() => setShowDrawer(true)}>
        Filters
      </Button>
      <FiltersDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        setFilters={setFilters}
      />
      {/*<Box*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    justifyContent: 'space-between',*/}
      {/*    alignItems: 'center',*/}
      {/*    gap: '1rem',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Search*/}
      {/*    searchKeyword={searchKeyword}*/}
      {/*    onChangeSearchQuery={onChangeSearchQuery}*/}
      {/*    onSearch={onSearch}*/}
      {/*  />*/}
      {/*  <Button variant="contained" onClick={() => setShowDrawer(true)}>*/}
      {/*    Filters*/}
      {/*  </Button>*/}
      {/*  <FiltersDrawer*/}
      {/*    showDrawer={showDrawer}*/}
      {/*    setShowDrawer={setShowDrawer}*/}
      {/*    setFilters={setFilters}*/}
      {/*  />*/}
      {/*</Box>*/}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
