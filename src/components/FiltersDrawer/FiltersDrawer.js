import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Drawer, IconButton, MenuItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';
import CustomSelect from '../forms/custom-elements/CustomSelect';
import { useTranslation } from 'react-i18next';
import { getCollectionData } from '../../services/collections.service';
import CustomTextField from '../forms/custom-elements/CustomTextField';

const FiltersDrawer = ({ showDrawer, setShowDrawer, setFilters, currentRoute }) => {
  const { t } = useTranslation();
  const [collectionList, setCollectionList] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleSelectedCollection = (e) => {
    setSelectedCollection(e.target.value);
  };

  useEffect(async () => {
    if (currentRoute === 'nfts') {
      await getCollectionData().then(({ data: { items } }) => {
        const collectionArray = items.map((item) => ({ id: item._id, value: item.name }));
        setCollectionList(collectionArray);
      });
    }
  }, [currentRoute]);

  return (
    <Drawer
      anchor="right"
      open={showDrawer}
      onClose={() => setShowDrawer(false)}
      PaperProps={{
        sx: {
          width: '300px',
        },
      }}
    >
      <Box p={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">Filters</Typography>
        <IconButton size="small" onClick={() => setShowDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box p={2}>
        {/* ------------ Collection ------------- */}
        {currentRoute === 'nfts' && (
          <>
            <CustomFormLabel htmlFor="collection">{t('Collection')}</CustomFormLabel>
            <CustomSelect
              labelId="demo-simple-select-label"
              id="collection"
              name="collection"
              onChange={handleSelectedCollection}
              value={selectedCollection}
              fullWidth
              size="small"
            >
              {collectionList !== undefined &&
                collectionList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
            </CustomSelect>
            <Box pt={3} />
          </>
        )}

        {/* ------------ Search Keyword -------------*/}
        <CustomFormLabel htmlFor="searchKeyword">{t('Search Keyword')}</CustomFormLabel>
        <CustomTextField
          id="searchKeyword"
          name="searchKeyword"
          variant="outlined"
          fullWidth
          size="small"
          value={searchKeyword}
          onChange={handleSearchKeyword}
        />
        <Box pt={3} />
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedCollection('');
              setSearchKeyword('');
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setFilters({ collectionId: selectedCollection, searchKeyword: searchKeyword });
              setShowDrawer(false);
            }}
          >
            Confirm
          </Button>
        </Box>
        <Box pt={3} />
      </Box>
    </Drawer>
  );
};

export default FiltersDrawer;
