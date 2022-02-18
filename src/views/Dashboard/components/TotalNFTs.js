import React from 'react';
import { Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

const TotalNFTs = () => {
  const theme = useTheme();

  const optionsdoughnutchart = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    colors: ['#6ac3fd', '#0b70fb', '#f64e60', '#26c6da', '#ffa800'],
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  const seriesdoughnutchart = [45, 15, 27, 18, 35];

  const { t } = useTranslation();

  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h4">Total NFTs</Typography>
        </Box>
      </Box>
      <CardContent>
        <Chart
          options={optionsdoughnutchart}
          series={seriesdoughnutchart}
          type="donut"
          height="350px"
        />
      </CardContent>
    </Card>
  );
};

export default TotalNFTs;
