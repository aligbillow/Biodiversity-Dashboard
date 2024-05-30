'use client';
import React, { useState, useEffect } from 'react';
import NavBar from './dashboard/Header';
import MyBarChart from './dashboard/BarChart';
import MyPieChart from './dashboard/PieChart';
import MyScatterPlot from './dashboard/ScatterPlot';
import MyLineChart from './dashboard/LineChart';
import DataVisualization from '@/components/DataVisualization';
import DataControls from '@/components/DataControls';

import dynamic from 'next/dynamic';

const StateParksMap = dynamic(() => import('@/components/StateParksMap'), { ssr: false });

const Page: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoaded(true);
    console.log("hello")

    const fetchData = async () => {
      const response = await fetch('/api/parks');
      const result = await response.json();
      console.log('result: ', result);
      setData(result);
    };

    fetchData();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <main className=" min-h-screen ">
        <StateParksMap parkData={data}/>
    </main>
  );
};

export default Page;
