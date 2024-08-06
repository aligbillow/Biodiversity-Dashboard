import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChartProviderProvider, {
  ChartProvider,
} from "@/providers/ChartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BioDiversity in State Parks",
  description: "A Data Visualization App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChartProvider>{children}</ChartProvider>
      </body>
    </html>
  );
}
