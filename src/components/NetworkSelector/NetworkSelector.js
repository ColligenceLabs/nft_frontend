import * as React from 'react';
import { IconButton, Popover } from '@mui/material';
import NETWORKS from './networks';

const NetworkSelector = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const currentNetwork = localStorage.getItem('cur_network') || 'klay';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetwork = (lng) => {
    setAnchorEl(null);
    localStorage.setItem('cur_network', lng);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <img
          src={NETWORKS.find((network) => network.value === currentNetwork).icon}
          alt="klay"
          height="20px"
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {NETWORKS.map((option) => (
          <IconButton key={option.value} onClick={() => handleChangeNetwork(option.value)}>
            <img src={option.icon} alt="klay" height="24px" />
          </IconButton>
        ))}
      </Popover>
    </div>
  );
};

export default NetworkSelector;
