import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/Header";
import Footer from "@/app/Footer";



export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html lang="en">
      <body >
      <Header/>
      <main>
      {children}  
      </main>
      <Footer/>
      
      
      
      
      </body>
      
    </html>
  );
}