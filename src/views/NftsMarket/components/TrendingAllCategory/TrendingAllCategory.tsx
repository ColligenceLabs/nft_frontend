import { Box, CardMedia, Typography, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import Slider from 'react-slick';
import img1 from '../../../../assets/images/products/s1.jpg';
import img2 from '../../../../assets/images/products/s2.jpg';
import img3 from '../../../../assets/images/products/s3.jpg';
import img4 from '../../../../assets/images/products/s4.jpg';
import img5 from '../../../../assets/images/products/s5.jpg';
import img6 from '../../../../assets/images/products/s6.jpg';
import img7 from '../../../../assets/images/products/s7.jpg';
import img8 from '../../../../assets/images/products/s8.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';

function Arrow(props: any) {
  const theme = useTheme();
  const { className, style, onClick, direction, color } = props;
  return (
    <div
      className={className}
      style={{ ...style, color: theme.palette.primary.main }}
      onClick={onClick}
    >
      {direction === 'next' ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
    </div>
  );
}

const TrendingAllCategory = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: mdDown ? 1 : 4,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  };

  return (
    <Box sx={{ mt: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', mb: '50px' }}>
        <Typography fontSize={'30px'} fontWeight={'700'}>
          Trending in
        </Typography>
        <Typography fontSize={'30px'} fontWeight={'700'} color={'primary'}>
          all cateogry
        </Typography>
      </Box>

      <Slider {...settings}>
        {[img1, img2, img3, img4, img5, img6, img7, img8].map((item, index) => (
          <Box key={index}>
            <CardMedia
              component="img"
              sx={{ px: '10px', height: '450px' }}
              image={item}
              alt="Live from space album cover"
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TrendingAllCategory;
