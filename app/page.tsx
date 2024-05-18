import React from 'react';
import NavBar from './dashboard/Header'
import MyBarChart from './dashboard/BarChart';
import MyPieChart from './dashboard/PieChart';
import MyScatterPlot from './dashboard/ScatterPlot';
import MyLineChart from './dashboard/LineChart';

const Page: React.FC = () => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
   
    <div>
      <NavBar />
    </div>
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
      <MyPieChart />
    </div>
      <MyBarChart />
      <MyScatterPlot />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
      <MyLineChart />
      </div>
  </main>
);

export default Page;
