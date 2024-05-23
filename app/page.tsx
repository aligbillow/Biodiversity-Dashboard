'use client';
import React, { useState, useEffect } from 'react';
import NavBar from './dashboard/Header';
import MyBarChart from './dashboard/BarChart';
import MyPieChart from './dashboard/PieChart';
import MyScatterPlot from './dashboard/ScatterPlot';
import MyLineChart from './dashboard/LineChart';
import DataVisualization from '@/components/DataVisualization';
import DataControls from '@/components/DataControls';

const Page: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div>
        <NavBar />
      </div>
      <div className="w-full h-full bg-yellow-500 flex flex-1">
        <DataVisualization />
        <DataControls />
        {/* <MyPieChart />
    </div>
      <MyBarChart />
      <MyScatterPlot />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
      <MyLineChart /> */}
      </div>
    </main>
  );
};

export default Page;
