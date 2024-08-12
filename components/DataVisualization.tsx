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

// defualt chart state display for user
// Info cards?
// padding header
// padding components

const NationalParksMap = dynamic(
  () => import("./ui/NationalParkMap/NationalParksMap"),
  {
    ssr: false,
  }
);

type Props = {
  parkData: ParkData[];
  speciesData: SpeciesData[];
  className?: string;
};

const DataVisualization = ({ parkData, speciesData, className }: Props) => {
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
      <Header className={styles.h1} level="h1">
        Biodiversity in National Parks
      </Header>
      <div style={{ display: "flex", width: "100%", paddingTop: "45px" }}>
        <NationalParksMap
          className={styles.mapContainer}
          parkData={parkData}
          onSelectPark={(park: ParkData) => handleSelectPark(park)}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
          }}
        >
          {selectedParks && (
            <div className={styles.buttonContainer}>
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

          <div className={styles.chartContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
