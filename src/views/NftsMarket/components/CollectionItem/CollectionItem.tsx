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
  creator_fullName,
}) => {
  const theme = useTheme();

  const avatarImage = creator_image?.replace(
    'https://nftbedev.talken.io/talkenNft/uploads',
    'http://localhost:4000/talkenNft',
  );

  return (
    <>
      <Link to={`/market/collection/${id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            p: 0,
            textDecoration: 'none',
            transition: 'all .2s ease-in-out',
            border: '0.1px solid #d6d6d6',
            borderRadius: '25px',
            '&:hover': {
              transform: `translateY(-${theme.spacing(1 / 2)})`,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={cover_image}
              alt="green iguana"
              sx={{ borderBottom: '0.1px solid #d6d6d6' }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                marginTop: '-25px',
                border: '3px solid #f1f1f1f1',
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
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4">{name}</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                mb: '10px',
              }}
            >
              <Typography variant={'caption'}>by </Typography>
              <Typography variant={'caption'} color={'primary'}>
                {creator_fullName}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {description && description.length > 100
                ? `${description.slice(0, 100)}...`
                : description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CollectionItem;
