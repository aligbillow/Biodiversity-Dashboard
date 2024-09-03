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

const SeasonalityBarChart = ({
  speciesData,
  onBarClick,
}: ChartComponentProps) => {
  const [seasonalityData, setSeasonalityData] = useState(null);
  const [sampleState, setSampleState] = useState<string>("Seasonality");

  useEffect(() => {
    if (speciesData) {
      const seasonalityData = speciesData.reduce((acc: any, curr: any) => {
        const seasonality = curr[sampleState];
        if (seasonality) {
          if (!acc[seasonality]) {
            acc[seasonality] = 0;
          }
          acc[seasonality]++;
        }
        return acc;
      }, {});
      setSeasonalityData(seasonalityData);
    }
  }, [speciesData, sampleState]);

  const chartData =
    seasonalityData &&
    Object.keys(seasonalityData).map((conservation: any) => ({
      name: conservation,
      count: seasonalityData[conservation],
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

export default SeasonalityBarChart;
