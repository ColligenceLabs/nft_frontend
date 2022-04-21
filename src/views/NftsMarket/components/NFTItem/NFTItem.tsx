import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NFTType } from '../../types';
import klayLogo from '../../../../assets/images/network_icon/klaytn-klay-logo.png';
import talkLogo from '../../../../assets/images/logos/talken_icon.png';
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import ImageViewer from '../../../../components/ImageViewer';
import useMediaQuery from '@mui/material/useMediaQuery';

interface NFTItemProp {
  item: NFTType;
  showLarge: boolean;
}
const NFTItem: React.FC<NFTItemProp> = ({ item, showLarge }) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  return (
    <>
      <Link to={`/market/detail/${item._id}`} style={{ textDecoration: 'none' }}>
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
            zIndex: 80,
            m: smDown ? '5px' : '10px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {item?.metadata?.content_Type === 'mp4' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  zIndex: 1000,
                  pt: 1.5,
                  pr: 2,
                }}
              >
                <Box
                  sx={{
                    border: '1px solid white',
                    borderRadius: '50%',
                    backgroundColor: 'gray',
                    opacity: 0.6,
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  boxShadow={3}
                >
                  <FeatherIcon icon="video" height="24" color={'white'} />
                </Box>
              </Box>
            )}

            <ImageViewer
              src={item?.metadata?.thumbnail}
              alt={item?.metadata?.name}
              style={{
                marginTop: item?.metadata?.content_Type === 'mp4' ? '-52px' : '0px',
              }}
              height={mdDown ? (showLarge ? '270px' : '170px') : showLarge ? '270px' : '170px'}
            />
          </Box>

          <CardContent sx={{ minHeight: smDown ? '70px' : '109px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'top',
                flexDirection: smDown ? 'column' : 'row',
              }}
            >
              <Box>
                <Typography variant="h6" color="text.secondary">
                  {item?.collection_id?.name.length > 30
                    ? `${item?.collection_id?.name.slice(0, 27)}...`
                    : item?.collection_id?.name}
                </Typography>
                <Typography variant="h6">{item?.metadata?.name}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Price
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {item?.quote === 'klay' && <img src={klayLogo} alt="klay" height="16px" />}
                  {item?.quote === 'talk' && <img src={talkLogo} alt="klay" height="16px" />}
                  {/*<img src={klayLogo} alt="klay" height="16px" />*/}
                  <Typography variant="h6">{item?.price}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default NFTItem;
