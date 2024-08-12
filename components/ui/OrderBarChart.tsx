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

const OrderBarChart = ({ speciesData }: ChartComponentProps) => {
  const [orderData, setOrderData] = useState(null);
  const [sampleState, setSampleState] = useState<any>("Order");

  useEffect(() => {
    if (speciesData) {
      const orderCount = speciesData.reduce((acc: any, curr: any) => {
        const order = curr[sampleState];
        if (order) {
          if (!acc[order]) {
            acc[order] = 0;
          }
          acc[order]++;
        }
        return acc;
      }, {});
      console.log(orderCount);
      setOrderData(orderCount);
    }
  }, [speciesData, sampleState]);
  console.log("sampleState: ", sampleState);

  const chartData =
    orderData &&
    Object.keys(orderData).map((order: any) => ({
      name: order,
      count: orderData[order],
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
            right: 35,
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

export default OrderBarChart;
