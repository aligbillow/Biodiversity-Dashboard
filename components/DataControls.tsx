import { useChartProviderContext } from '@/providers/ChartProvider';
import React from 'react';

type Props = {};

const DataControls = ({}: Props) => {
  const { chartToDisplay } = useChartProviderContext();
  console.log('chartToDisplay: ', chartToDisplay);

  const charts = ['PieChart', 'BarChart', 'ScatterPlot', 'LineChart'];

  const handleChartSelection = (event: any) => {
    console.log('event: ', event);
  };

  return (
    <div className="bg-blue-200 w-1/4">
      <h1>DataControls</h1>

      <div className="flex flex-col">
        {charts.map((chart, index) => (
          <button
            name={chart}
            onClick={handleChartSelection}
            className="border p-4"
            key={index}
            value={chart}
          >
            {chart}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataControls;
