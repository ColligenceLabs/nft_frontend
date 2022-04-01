import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from 'react-slick';
import nft1 from '../../../../assets/images/products/landing_nft1.png';
import nft2 from '../../../../assets/images/products/landing_nft2.png';

const Hero = (): JSX.Element => {
  const theme = useTheme();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
  };

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  console.log(isMd);

  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} md={6} alignItems={'center'}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2} sx={{ textAlign: 'center' }}>
            <Typography fontSize={'40px'} color="text.primary" sx={{ fontWeight: 700 }}>
              NFTs with DeFi…
              <br />
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
                sx={{
                  background: `linear-gradient(180deg, transparent 82%, ${alpha(
                    theme.palette.secondary.main,
                    0.3,
                  )} 0%)`,
                }}
              >
                Get your extra profits.
              </Typography>
            </Typography>
          </Box>
          <Box marginBottom={3} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" component="p" color="text.secondary">
              Create and trade NFTs on the TaalSwap Marketplace or generate additional revenue
              through TaalSwap&apos;s DeFi service.
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent={'center'}
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
            >
              Start now
            </Button>
            <Box
              component={Button}
              variant="outlined"
              color="primary"
              size="large"
              marginTop={{ xs: 2, sm: 0 }}
              marginLeft={{ sm: 2 }}
              fullWidth={isMd ? false : true}
            >
              Learn more
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        // container
        // display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
        // data-aos="flip-left"
        // data-aos-easing="ease-out-cubic"
        // data-aos-duration="2000"
      >
        <Box sx={{ px: '30px' }}>
          <Slider {...settings}>
            {[nft1, nft2].map((item, index) => (
              <Box
                key={index}
                component={LazyLoadImage}
                height={1}
                width={1}
                src={item}
                alt="..."
                effect="blur"
                boxShadow={3}
                borderRadius={2}
                // maxWidth={600}
                sx={{
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                }}
              />
              // <CardMedia
              //   key={index}
              //   component="img"
              //   sx={{ width: 300 }}
              //   image={item}
              //   alt="Live from space album cover"
              // />
            ))}
          </Slider>
        </Box>
        {/*<Box*/}
        {/*  component={LazyLoadImage}*/}
        {/*  height={1}*/}
        {/*  width={1}*/}
        {/*  src={'https://assets.maccarianagency.com/screenshots/dashboard.png'}*/}
        {/*  alt="..."*/}
        {/*  effect="blur"*/}
        {/*  boxShadow={3}*/}
        {/*  borderRadius={2}*/}
        {/*  maxWidth={600}*/}
        {/*  sx={{*/}
        {/*    filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',*/}
        {/*  }}*/}
        {/*/>*/}
      </Grid>
    </Grid>
  );
};

export default Hero;
