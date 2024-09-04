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
  // console.log("data: ", data);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/parks");
      const result = await response.json();
      // console.log("result: ", result);
      setData(result);
      setLoaded(true);
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
        url(&#39;https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap&#39;);
      </style>

      {/* <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      /> */}
      <DataVisualization parkData={data.parks} speciesData={data.species} />
    </main>
  );
};

export default Page;
