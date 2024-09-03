import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Rectangle,
  XAxis,
  CartesianGrid,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { SpeciesData } from "@/types/species";

type ChartComponentProps = {
  speciesData: SpeciesData[];
  onBarClick: (data: { name: string; count: number }) => void;
};

const ConservationBarChart = ({
  speciesData,
  onBarClick,
}: ChartComponentProps) => {
  const [conservationData, setConservationData] = useState(null);
  const [sampleState, setSampleState] = useState<any>("Conservation Status");

  useEffect(() => {
    if (speciesData) {
      const conservationCount = speciesData.reduce((acc: any, curr: any) => {
        const conservation = curr[sampleState];
        if (conservation) {
          if (!acc[conservation]) {
            acc[conservation] = 0;
          }
          acc[conservation]++;
        }
        return acc;
      }, {});
      setConservationData(conservationCount);
    }
  }, [speciesData, sampleState]);

  const chartData =
    conservationData &&
    Object.keys(conservationData).map((conservation: any) => ({
      name: conservation,
      count: conservationData[conservation],
    }));

  if (chartData)
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={700}
          height={300}
          data={chartData}
          margin={{
            top: 0,
            right: 35,
            left: 0,
            bottom: 5,
          }}
          onClick={(data) => {
            if (data && data.activePayload && data.activePayload[0]) {
              onBarClick(data.activePayload[0].payload);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#454839"
            activeBar={<Rectangle fill="#138483" stroke="#205c35" />}
            cursor="pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    );
};

export default ConservationBarChart;
