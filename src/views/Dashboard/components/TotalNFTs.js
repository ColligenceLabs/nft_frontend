import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

const chartOption = {
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
        size: '60px',
      },
    },
  },
  legend: {
    show: true,
    position: 'bottom',
    width: '50px',
  },
  colors: ['#6ac3fd', '#f64e60', '#26c6da', '#ffa800'],
  tooltip: {
    theme: 'dark',
    fillSeriesColor: false,
  },
};

const TotalNFTs = ({ chartData }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (chartData.data !== undefined && chartData.header !== undefined) {
      setData(chartData.data);
      setLabels(chartData.header);
    }
  }, [chartData]);

  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h4">{t('Total NFTs')}</Typography>
        </Box>
      </Box>
      <CardContent>
        <Chart options={{ ...chartOption, labels }} series={data} type="donut" height="350px" />
      </CardContent>
    </Card>
  );
};

export default TotalNFTs;
