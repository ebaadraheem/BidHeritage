
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuctionProvider } from "./UserContext/UserContext";
export const metadata = {
  title: "BidHeritage",
  description: "Welcome to BidHeritage, your premier destination for discovering and bidding on unique antiques. Connect with sellers offering rare and valuable items, and join our community of collectors and enthusiasts today.",
};

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="">
          <AuctionProvider>
            <Navbar />
            <Toaster />
            {children}
            <Footer />
          </AuctionProvider>
        </div>
      </body>
    </html>
  );
}
