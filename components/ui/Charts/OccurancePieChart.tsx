import React, { useState, useEffect } from "react";
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { SpeciesData } from "@/types/species";
import { aggregateData, DataEntry, prepareChartData } from "@/lib/serverutils";

type PieChartComponentProps = {
  speciesData: SpeciesData[];
  parkName: string;
  onPieClick: (data: { name: string; count: number }) => void;
};
const PieChartComponent: React.FC<PieChartComponentProps> = ({
  speciesData,
  parkName,
  onPieClick,
}) => {
  const [chartData, setChartData] = useState<any>(null);
  const COLORS = ["#205c35", "#9ab642", "#717c48", "#454839"];

  useEffect(() => {
    if (speciesData) {
      const aggregatedData = aggregateData(speciesData as DataEntry[]);
      const chartData = prepareChartData(
        parkName,
        "Occurrence",
        aggregatedData
      );
      setChartData(chartData);
    }
  }, [speciesData]);

  if (!chartData) return <div>...loading chart</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart
        width={200}
        height={300}
        margin={{
          top: 5,
          right: 35,
          left: 20,
          bottom: 5,
        }}
        onClick={(data) => {
          if (data && data.activePayload && data.activePayload[0]) {
            onPieClick(data.activePayload[0].payload);
          }
        }}
      >
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          fill="#8884d8"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(2)}%`
          }
          outerRadius={80}
          dataKey="value"
          cursor="pointer"
        >
          {chartData.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
