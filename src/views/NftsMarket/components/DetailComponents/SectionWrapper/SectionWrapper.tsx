import React from 'react';
import { Box, Typography } from '@mui/material';
// @ts-ignore
import FeatherIcon from 'feather-icons-react';

interface SectionWrapperProps {
  title: string;
  icon: string;
  maxHeight?: string | undefined;
  children: JSX.Element | JSX.Element[];
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, icon, children, maxHeight }) => {
  return (
    <Box
      sx={{
        mt: 2,
        border: '0.5px solid #d6d6d6',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '0.25rem',
          borderBottom: 0.5,
          borderColor: '#d6d6d6',
          p: 2,
        }}
      >
        <FeatherIcon icon={icon} width="20" />
        <Typography variant={'h4'}>{title}</Typography>
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          overflowY: 'scroll',
          maxHeight: maxHeight === undefined ? '100%' : maxHeight,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SectionWrapper;
