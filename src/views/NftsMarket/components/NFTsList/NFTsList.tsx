import React from 'react';
import { Box, Grid } from '@mui/material';
import NFTsItem from '../NFTsItem';

const mock = [
  {
    id: 0,
    image: 'https://assets.maccarianagency.com/backgrounds/img8.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    title: 'Lorem ipsum dolor sit amet,',
  },
  {
    id: 1,
    image: 'https://assets.maccarianagency.com/backgrounds/img9.jpg',
    description: 'Excepteur sint occaecat cupidatat non proident',
    title: 'Consectetur adipiscing elit',
  },
  {
    id: 2,
    image: 'https://assets.maccarianagency.com/backgrounds/img12.jpg',
    description: 'Eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    title: 'Labore et dolore magna aliqua',
  },
  {
    id: 3,
    image: 'https://assets.maccarianagency.com/backgrounds/img11.jpg',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Eiusmod tempor incididunt',
  },
  {
    id: 4,
    image: 'https://assets.maccarianagency.com/backgrounds/img11.jpg',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus',
    title: 'Sed ut perspiciatis',
  },
  {
    id: 5,
    image: 'https://assets.maccarianagency.com/backgrounds/img12.jpg',
    description: 'Qui blanditiis praesentium voluptatum deleniti atque corrupti',
    title: 'Unde omnis iste natus',
  },
  {
    id: 6,
    image: 'https://assets.maccarianagency.com/backgrounds/img9.jpg',
    description: 'On the other hand, we denounce with righteous indignation and dislike',
    title: 'Sit voluptatem',
  },
  {
    id: 7,
    image: 'https://assets.maccarianagency.com/backgrounds/img8.jpg',
    description: 'Quos dolores et quas molestias excepturi',
    title: 'Accusantium doloremque',
  },
  {
    id: 8,
    image: 'https://assets.maccarianagency.com/backgrounds/img12.jpg',
    description: 'Et harum quidem rerum facilis est et expedita distinctio',
    title: 'Totam rem aperiam',
  },
  {
    id: 9,
    image: 'https://assets.maccarianagency.com/backgrounds/img11.jpg',
    description: 'Nam libero tempore, cum soluta nobis est eligendi optio',
    title: 'Uae ab illo inventore',
  },
  {
    id: 10,
    image: 'https://assets.maccarianagency.com/backgrounds/img8.jpg',
    description: 'Itaque earum rerum hic tenetur a sapiente delectus',
    title: 'Beatae vitae dicta',
  },
  {
    id: 11,
    image: 'https://assets.maccarianagency.com/backgrounds/img9.jpg',
    description: 'On the other hand, we denounce with righteous indignation and dislike',
    title: 'Nemo enim ipsam',
  },
];

const NFTsList = (): JSX.Element => {
  return (
    <Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <NFTsItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NFTsList;
