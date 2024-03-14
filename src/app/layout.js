import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from './components/header/index'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  weight: ["400", "700", "100", "300", "500", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-roboto">
      <Header/>
      {children}
      </body>
    </html>
  );
}
