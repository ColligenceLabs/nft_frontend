import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import footerlogo_img from '../../../../assets/images/logos/footer_Logo.png';
import messege_icon from '../../../../assets/images/logos/messege_icon_w.svg';
import page_icon from '../../../../assets/images/logos/page_icon_w.svg';
import twitter_icon from '../../../../assets/images/logos/twitter_icon_w.svg';
import gitbook_icon from '../../../../assets/images/logos/gitbook_icon_w.svg';
import github_icon from '../../../../assets/images/logos/github_icon_w.svg';
import mail_icon from '../../../../assets/images/logos/mail_icon_w.svg';

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const currentLang = localStorage.getItem('cur_language') || 'en';
  return (
    <Box sx={{ width: '100%', backgroundColor: '#161C24' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '40px 24px',
        }}
      >
        <Box className="footer_left">
          <img src={footerlogo_img} alt="logo_img" className="footer_logo" />
          {/* <p>&copy; All rights reserved. Made by TaalSwap. </p> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box style={{ marginLeft: '18.5px' }}>
            <Link href="https://twitter.com/taal_fi" target="_blank">
              <img src={twitter_icon} alt="twitter_icon" />
            </Link>
          </Box>
          <Box style={{ marginLeft: '18.5px' }}>
            {currentLang === 'ko-KR' ? (
              <Link href="https://t.me/TaalSwap_kr" target="_blank">
                <img src={page_icon} alt="page_icon" />
              </Link>
            ) : (
              <Link href="https://t.me/TaalSwapOfficial" target="_blank">
                <img src={page_icon} alt="page_icon" />
              </Link>
            )}
          </Box>
          <Box style={{ marginLeft: '18.5px' }}>
            <Link href="https://taalswap.medium.com" target="_blank">
              <img src={messege_icon} alt="messege_icon" />
            </Link>
          </Box>
          <Box style={{ marginLeft: '18.5px' }}>
            <Link href="https://docs.taalswap.finance/taalswap-docs/" target="_blank">
              <img src={gitbook_icon} alt="gitbook_icon" />
            </Link>
          </Box>
          <Box style={{ marginLeft: '18.5px' }}>
            <Link href="https://github.com/taalswap" target="_blank">
              <img src={github_icon} alt="github_icon" />
            </Link>
          </Box>
          <Box style={{ marginLeft: '18.5px' }}>
            <Link href="mailto:taalswap.dev@gmail.com" target="_blank">
              <img src={mail_icon} alt="github_icon" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
