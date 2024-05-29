import path from 'path';
import { csvToJson } from '../../../lib/utils'; //make a util to turn csv into json
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', 'parks.csv'); // Adjust the path as necessary
  try {
    const jsonData = await csvToJson(filePath);
    console.log('jsonData: ', jsonData);
    return new Response(JSON.stringify(jsonData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

