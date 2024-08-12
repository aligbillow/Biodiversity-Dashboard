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
};
const PieChartComponent: React.FC<PieChartComponentProps> = ({
  speciesData,
  parkName,
}) => {
  const [chartData, setChartData] = useState<any>(null);
  const COLORS = ["#46807f", "#bffcfa", "#00c9ca", "#205c35"];

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
      <PieChart width={300} height={400}>
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
        >
          {chartData.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Tooltip /> */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
