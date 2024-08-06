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
};

const CategoryBarChart = ({ speciesData }: ChartComponentProps) => {
  const [catergoryData, setCategoryData] = useState(null);
  const [barChartFilter, setBarChartFilter] = useState<any>("Category");

  useEffect(() => {
    if (speciesData) {
      const categoryCount = speciesData.reduce((acc: any, curr: any) => {
        const category = curr[barChartFilter];
        if (category) {
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category]++;
        }
        return acc;
      }, {});
      console.log(categoryCount);
      setCategoryData(categoryCount);
    }
  }, [speciesData, barChartFilter]);

  const chartData =
    catergoryData &&
    Object.keys(catergoryData).map((category: any) => ({
      name: category,
      count: catergoryData[category],
    }));

  if (chartData)
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={600}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#205c35"
            activeBar={<Rectangle fill="#778150" stroke="#205c35" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
};

export default CategoryBarChart;
