import React from 'react';
import { Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Search from '../Search/Search';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';

const EnhancedTableToolbar = (props) => {
  const { t } = useTranslation();
  const { numSelected, searchQuery, onChangeSearchQuery } = props;

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

      <Search searchQuery={searchQuery} onChangeSearchQuery={onChangeSearchQuery} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onChangeSearchQuery: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
