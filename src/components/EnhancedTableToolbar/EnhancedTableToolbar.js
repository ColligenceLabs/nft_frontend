import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Search from '../Search/Search';
import PropTypes from 'prop-types';

const EnhancedTableToolbar = (props) => {
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
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Filter
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
