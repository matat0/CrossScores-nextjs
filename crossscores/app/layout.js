import { Nunito } from "next/font/google";
import { createTheme } from '@mui/material/styles';
import { white } from '@mui/material/colors';
import "./Globals/globals.css";

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

const theme = createTheme({
  palette: {
    primary: white,
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        {children}
      </body>
    </html>
  );
}
