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

const OrderBarChart = ({ speciesData, onBarClick }: ChartComponentProps) => {
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
      setOrderData(orderCount);
    }
  }, [speciesData, sampleState]);

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

export default OrderBarChart;
