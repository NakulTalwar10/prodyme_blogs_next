import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from './components/header/index'
import Footer from './components/Footer/index'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  weight: ["400", "700", "100", "300", "500", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Prodyme Homes",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-roboto">
      <Header/>
      
      {children}
      
      <Footer/>
      </body>
    </html>
  );
}
