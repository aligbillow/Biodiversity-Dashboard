"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CategoryBarChart from "./ui/Charts/CategoryBarChart";
import PieChartComponent from "./ui/Charts/OccurancePieChart";
import OrderBarChart from "./ui/Charts/OrderBarChart";
import InfoCard from "./ui/InfoCard/InfoCard";
import { ParkData } from "@/types/park";
import { SpeciesData } from "@/types/species";
import Header from "./ui/Header/Header";
import styles from "./App.module.css";

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
  const [selectedData, setSelectedData] = useState<{
    name: string;
    count: number;
  } | null>(null);

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
  const handleBarClick = (data: { name: string; count: number }) => {
    setSelectedData(data);
  };
  const handleCloseInfoCard = () => {
    setSelectedData(null);
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
          {!selectedParks ? (
            <div className={styles.defaultMessage}>
              <p>Click map to load visualization</p>
            </div>
          ) : (
            <>
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

              <div className={styles.chartContainer}>
                {chartToDisplay === "BAR_CHART" && (
                  <CategoryBarChart
                    speciesData={selectedParkSpeciesData}
                    onBarClick={handleBarClick}
                  />
                )}

                {chartToDisplay === "PIE_CHART" && (
                  <PieChartComponent
                    speciesData={selectedParkSpeciesData}
                    parkName={selectedParks?.Park}
                    onPieClick={handleBarClick}
                  />
                )}

                {chartToDisplay === "Order" && (
                  <OrderBarChart
                    speciesData={selectedParkSpeciesData}
                    onBarClick={handleBarClick}
                  />
                )}
              </div>

              {selectedData && (
                <InfoCard
                  onClose={handleCloseInfoCard}
                  className={styles.InfoCard}
                  data={selectedData}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DataVisualization;
