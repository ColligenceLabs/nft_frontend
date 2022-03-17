import React from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { CollectionItemType } from '../../types';

const CollectionItem: React.FC<CollectionItemType> = ({
  id,
  name,
  cover_image,
  description,
  creator_image,
}) => {
  const theme = useTheme();

  const avatarImage = creator_image.replace(
    'https://nftbedev.talken.io/talkenNft/uploads',
    'http://localhost:4000/talkenNft',
  );

  console.log(description);
  return (
    <>
      <Link to={`/market/collection/${id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            maxWidth: 345,
            p: 0,
            textDecoration: 'none',
            transition: 'all .2s ease-in-out',
            border: '0.1px solid gray',
            borderRadius: '25px',
            '&:hover': {
              transform: `translateY(-${theme.spacing(1 / 2)})`,
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardMedia component="img" height="150" image={cover_image} alt="green iguana" />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                marginTop: '-25px',
                border: '3px solid white',
                borderRadius: '100%',
                p: 3,
              }}
            >
              <Avatar
                src={avatarImage}
                alt={'avatarImage'}
                sx={{
                  width: '50px',
                  height: '50px',
                }}
              />
            </Box>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description && description.slice(0, 200)}...
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CollectionItem;
