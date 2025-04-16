import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito ({
  subsets: ['latin'],
  variable: "--font-nunito",
})

export const metadata = {
  title: "Cross Scores Tracker",
  description: "Created by Matthew Bangit & Yohannes Gebrechirstos",
  icons: {
    icon: "/logo.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        {children}
      </body>
    </html>
  );
}
