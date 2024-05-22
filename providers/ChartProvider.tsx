'use client';
import React, {
  useContext,
  useEffect,
  createContext,
  useReducer,
  useState,
} from 'react';

type Props = {
  children: React.ReactNode;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: string = 'PieChart';

type ChartProviderContextType = {
  chartToDisplay: string;
  setChartToDisplay: React.Dispatch<React.SetStateAction<string>>;
};

const ChartProviderContext = createContext<ChartProviderContextType | null>(
  null,
);
export const useChartProviderContext = () => useContext(ChartProviderContext)!;

export const ChartProvider: React.FC<Props> = ({ children }: Props) => {
  const [chartToDisplay, setChartToDisplay] = useState(initialState);

  return (
    <ChartProviderContext.Provider
      value={{
        chartToDisplay,
        setChartToDisplay,
      }}
    >
      {children}
    </ChartProviderContext.Provider>
  );
};

export default ChartProvider;
