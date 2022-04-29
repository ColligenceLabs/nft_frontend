import React, { useState } from 'react';
import { Card } from '@mui/material';
import ReactPlayer from 'react-player';
// @ts-ignore
import FsLightbox from 'fslightbox-react';
import ImageViewer from '../../../../../components/ImageViewer';

interface DetailContentsProps {
  content_Type: string;
  alt_url: string;
  name: string;
}

const DetailContents: React.FC<DetailContentsProps> = ({ content_Type, alt_url, name }) => {
  const [toggled, setToggled] = useState(false);
  return (
    <>
      {content_Type === 'mp4' ? (
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '600px',
          }}
        >
          <ReactPlayer
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            url={alt_url}
            width="100%"
            height="100%"
            controls={true}
            light={false}
            pip={true}
            playIcon={<button>Play</button>}
          />
        </Card>
      ) : (
        <Card sx={{ p: 0, m: 0 }} onClick={() => setToggled(!toggled)}>
          <ImageViewer src={alt_url} alt={name} />
        </Card>
      )}
      <FsLightbox toggler={toggled} sources={[alt_url]} type="image" />
    </>
  );
};

export default DetailContents;
