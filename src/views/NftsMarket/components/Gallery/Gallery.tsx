import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// @ts-ignore
import FsLightbox from 'fslightbox-react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, ImageList, ImageListItem, Button } from '@mui/material';

const Gallery = (): JSX.Element => {
  const theme = useTheme();
  const [toggler, setToggler] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const photos = [
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img5.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img5.jpg',
      rows: 1,
      cols: 2,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img6.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img6.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img7.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img7.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img10.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img10.jpg',
      rows: 1,
      cols: 2,
    },
  ];

  return (
    <Box>
      <Box display={'flex'} justifyContent={'flex-end'} marginBottom={2}>
        <Button
          color="primary"
          size="large"
          endIcon={
            <svg
              width={16}
              height={16}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          }
        >
          Move to market
        </Button>
      </Box>
      <Box>
        <ImageList variant="quilted" cols={3} rowHeight={isMd ? 300 : 200} gap={isMd ? 16 : 4}>
          {photos.map((item, i) => (
            <ImageListItem key={i} cols={item.cols} rows={item.rows}>
              <LazyLoadImage
                height={'100%'}
                width={'100%'}
                src={item.src}
                alt="..."
                effect="blur"
                onClick={() => {
                  setSelectedImage(item.source);
                  // setToggler(!toggler);
                }}
                style={{
                  objectFit: 'cover',
                  // cursor: 'pointer',
                  borderRadius: 8,
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <FsLightbox toggler={toggler} sources={[selectedImage]} type="image" />
    </Box>
  );
};

export default Gallery;
