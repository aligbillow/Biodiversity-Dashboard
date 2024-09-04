export interface DataEntry {
  "Species ID": string;
  Park: string;
  Category: string;
  Order: string;
  Family: string;
  "Scientific Name": string;
  "Common Names": string;
  "Record Status": string;
  Occurrence: string;
  Nativeness: string;
  Abundance: string;
  Seasonality: string;
  "Conservation Status": string;
  "": string;
}

export interface AggregatedData {
  [park: string]: {
    [status: string]: {
      [value: string]: number;
    };
  };
}

export interface ChartDataEntry {
  name: string;
  value: number;
}

// Function to aggregate the data
export const aggregateData = (data: DataEntry[]): AggregatedData => {
  const parkStatusCount: AggregatedData = {};

  data.forEach((entry) => {
    const park = entry.Park;

    if (!parkStatusCount[park]) {
      parkStatusCount[park] = {
        Occurrence: {},
        Nativeness: {},
        Abundance: {},
        Seasonality: {},
        "Conservation Status": {},
      };
    }

    [
      "Occurrence",
      "Nativeness",
      "Abundance",
      "Seasonality",
      "Conservation Status",
    ].forEach((status) => {
      const statusKey = status as keyof DataEntry; // Casting status to a key of DataEntry
      const statusValue = entry[statusKey] || "Unknown"; // Using the cast key
      // const statusValue = entry[status] || "Unknown"; // Type error
      if (!parkStatusCount[park][status][statusValue]) {
        parkStatusCount[park][status][statusValue] = 0;
      }
      parkStatusCount[park][status][statusValue]++;
    });
  });

  return parkStatusCount;
};

// Function to prepare chart data
export const prepareChartData = (
  park: string,
  status: string,
  data: AggregatedData
): ChartDataEntry[] => {
  const chartData: ChartDataEntry[] = [];

  // Check if the park exists in the data
  if (!data[park]) {
    console.error(`Park "${park}" not found in the data`);
    return chartData;
  }

  // Check if the status exists for the park
  if (!data[park][status]) {
    console.error(`Status "${status}" not found for park "${park}"`);
    return chartData;
  }

  Object.keys(data[park][status]).forEach((value) => {
    chartData.push({
      name: value,
      value: data[park][status][value],
    });
  });

  return chartData;
};
