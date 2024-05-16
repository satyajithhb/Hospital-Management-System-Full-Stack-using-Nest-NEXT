import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hopital Management System",
  description: "Doctor Portal by Satyajit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body style={{ backgroundColor: '#DAF7A6' }}> */}
      <body>
        <Header />
        <main className={inter.className}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
