import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CircularProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { getLas30Day } from '../../../services/dashboard.service';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const chartOption = {
  chart: {
    height: 250,
    type: 'line',
    fontFamily: "'DM Sans', sans-serif",
    foreColor: '#adb0bb',
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      color: 'rgba(0,0,0,0.2)',
      top: 12,
      left: 4,
      blur: 3,
      opacity: 0.4,
    },
  },
  stroke: {
    width: 3,
    curve: 'smooth',
  },

  // xaxis: {
  //   // type: 'datetime',
  //   categories: [
  //     '1/11/2000',
  //     '2/11/2000',
  //     '3/11/2000',
  //     '4/11/2000',
  //     '5/11/2000',
  //     '6/11/2000',
  //     '7/11/2000',
  //     '8/11/2000',
  //     '9/11/2000',
  //     '10/11/2000',
  //     '11/11/2000',
  //     '12/11/2000',
  //     '1/11/2001',
  //     '2/11/2001',
  //     '5/11/2001',
  //     '6/11/2001',
  //   ],
  // },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#0b70fb'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 0.9,
      stops: [0, 100, 100, 100],
    },
  },
  markers: {
    size: 1.5,
    opacity: 0.9,
    colors: ['#4e79ff'],
    strokeColor: '#fff',
    strokeWidth: 2,

    hover: {
      size: 7,
    },
  },
  // yaxis: {
  //   min: -40,
  //   max: 40,
  // },
  tooltip: {
    theme: 'dark',
  },
  grid: {
    show: false,
  },
};

const Last30days = () => {
  const { t } = useTranslation();

  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLast30DayData = async () => {
    await getLas30Day().then((res) => {
      let totalArray = [];
      let nftArray = [];
      let collectionArray = [];
      let categoryArray = [];
      res.data.map((item) => {
        if (item.name === 'total_revenue') {
          categoryArray = categoryArray.concat(
            new Date(item.createdAt).toLocaleDateString('en-GB', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }),
          );
          totalArray = totalArray.concat(item.value);
        } else if (item.name === 'nft_revenue') {
          nftArray = nftArray.concat(item.value);
        } else if (item.name === 'collection_revenue')
          collectionArray = collectionArray.concat(item.value);
      });

      setChartData([
        { name: 'total_revenue', data: totalArray },
        { name: 'nft_revenue', data: nftArray },
        { name: 'collection_revenue', data: collectionArray },
      ]);
      setCategories(categoryArray);
      setLoading(true);
    });
  };

  useEffect(() => {
    fetchLast30DayData();
  }, []);

  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h4">Last 30 days</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <AccessAlarmOutlinedIcon fontSize="small" />
          <Typography variant="body2">Updated at:</Typography>
        </Box>
      </Box>
      <CardContent>
        {loading ? (
          <Chart
            options={{ ...chartOption, xaxis: { categories } }}
            series={chartData}
            type="line"
            height="300px"
          />
        ) : (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Last30days;
