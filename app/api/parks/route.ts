import path from "path";
import { csvToJson } from "../../../lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const filePaths = [
    path.join(process.cwd(), "public", "parks.csv"), // Adjust the path as necessary
    path.join(process.cwd(), "public", "species.csv"),
  ];

  try {
    const jsonData = await Promise.all(
      filePaths.map((filePath) => csvToJson(filePath))
    );
    console.log("jsonData: ", jsonData); // Log for debugging
    const combinedJsonData = {
      parks: jsonData[0],
      species: jsonData[1],
    };

    return new Response(JSON.stringify(combinedJsonData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error reading CSV file:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
