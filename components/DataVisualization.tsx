"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CategoryBarChart from "./ui/CategoryBarChart";
import PieChartComponent from "./ui/OccurancePieChart";
import OrderBarChart from "./ui/OrderBarChart";
import { ParkData } from "@/types/park";
import { SpeciesData } from "@/types/species";
import Header from "./ui/Header/Header";
import styles from "./App.module.css";

const StateParksMap = dynamic(() => import("./ui/StateParksMap"), {
  ssr: false,
});

type Props = {
  parkData: ParkData[];
  speciesData: SpeciesData[];
};

const DataVisualization = ({ parkData, speciesData }: Props) => {
  const [selectedParks, setSelectedParks] = useState<ParkData | null>(null);
  const [chartToDisplay, setChartToDisplay] = useState<string>("BAR_CHART");
  const [selectedParkSpeciesData, setSelectedParkSpeciesData] = useState<
    SpeciesData[]
  >([]);

  useEffect(() => {
    if (selectedParks && speciesData) {
      const combinedData = speciesData.filter(
        (data) => data.Park === selectedParks.Park
      );
      setSelectedParkSpeciesData(combinedData);
    }
  }, [selectedParks, speciesData]);

  const handleSelectPark = (park: ParkData) => {
    setSelectedParks(park);
  };

  return (
    <div className={styles.mainContainer}>
      <Header level="h1">BioDiversity in State Parks</Header>
      <StateParksMap
        parkData={parkData}
        onSelectPark={(park: ParkData) => handleSelectPark(park)}
      />
      {selectedParks && (
        <div className={styles.buttonsContainter}>
          <button
            className={styles.button}
            onClick={() => setChartToDisplay("BAR_CHART")}
          >
            Category
          </button>
          <button
            className={styles.button}
            onClick={() => setChartToDisplay("PIE_CHART")}
          >
            Occurance
          </button>
          <button
            className={styles.button}
            onClick={() => setChartToDisplay("Order")}
          >
            Order
          </button>
        </div>
      )}
      {selectedParkSpeciesData && chartToDisplay === "BAR_CHART" && (
        <CategoryBarChart speciesData={selectedParkSpeciesData} />
      )}
      {selectedParkSpeciesData &&
        selectedParks?.Park &&
        chartToDisplay === "PIE_CHART" && (
          <PieChartComponent
            speciesData={selectedParkSpeciesData}
            parkName={selectedParks?.Park}
          />
        )}
      {selectedParkSpeciesData && chartToDisplay === "Order" && (
        <OrderBarChart speciesData={selectedParkSpeciesData} />
      )}
    </div>
  );
};

export default DataVisualization;
