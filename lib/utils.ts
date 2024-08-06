import fs from 'fs';
import { parse } from 'csv-parse';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const csvToJson = (filePath:any) => {
  return new Promise((resolve, reject) => {
    const data:any = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true }))
      .on('data', (row:any) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error:any) => {
        reject(error);
      });
  });
};