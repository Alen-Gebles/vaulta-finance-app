import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "./path/sidebar/page"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vaulta",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        {children}
        </body>
    </html>
  );
}
