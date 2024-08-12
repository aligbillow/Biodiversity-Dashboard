"use client";

import React, { useState, useEffect } from "react";
import DataVisualization from "@/components/DataVisualization";
import { ParkData } from "@/types/park";
import { SpeciesData } from "@/types/species";

type AppData = {
  parks: ParkData[];
  species: SpeciesData[];
};

const Page = () => {
  const [data, setData] = useState<AppData | null>(null);
  // const [filteredData, setFilteredData] = useState<AppData[]>();
  console.log("data: ", data);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/parks");
      const result = await response.json();
      console.log("result: ", result);
      setData(result);
      setLoaded(true);
      // setFilteredData(data);
    };
    fetchData();
  }, []);

  if (!loaded || !data) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
      </style>
      <DataVisualization parkData={data.parks} speciesData={data.species} />
    </main>
  );
};

export default Page;
