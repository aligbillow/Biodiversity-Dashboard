import React from 'react';
import MyPieChart from '../app/dashboard/PieChart';
import MyBarChart from '../app/dashboard/BarChart';
import MyScatterPlot from '../app/dashboard/ScatterPlot';
import MyLineChart from '../app/dashboard/LineChart';

type Props = {};

const DataVisualization = ({}: Props) => {
  return (
    <div className="bg-pink-200 w-3/4 flex flex-col items-center justify-center overflow-scroll h-full">
      <MyPieChart />
      <MyBarChart />
      <MyScatterPlot />
      <MyLineChart />
    </div>
  );
};

export default DataVisualization;
