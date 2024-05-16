import React from "react";
import Image from "next/image";
import img1 from "../public/home.jpg.jpg"
import img from "../public/images.png"
import Link from "next/link";


export default function Home() {
  return (
    <>
       <nav className="p-6 flex bg bg-green-200 justify-between items-center">
          <a href="/" className="flex gap-2 items-center">
              <Image src={img} width={30} height={30} alt="logo"></Image>
              <span className="text-lg font-bold font-display hover:color">Aiub Hospital Management System</span>
          </a>
  
          <div className="flex gap-10">    
            <Link href='/'>Home</Link>
         
          </div>  
          <div className="flex gap-7">
          <Link href='/aiub-Hospital-Management/SignIn'>Signin</Link> 
         
          <Link href='/aiub-Hospital-Management/SignUp'>SignUp</Link>
            
          </div>   

          <div>
          
          </div>
             
           
        </nav>

        <main>
      
      <div className="flex justify-start p-6">
      <Image src={img1} width={500} height={200} alt="logo" ></Image>
      <span className="flex justify-items-end p-40 font-semibold text-9xl text-green-500 ">Welcome to Aiub Hospital Management System</span>
      </div>

      <footer>
      <div className="footerContainer">
        <p>&copy; {new Date().getFullYear()}Aiub Hospital Management System. All rights reserved.</p>
      </div>
    </footer>
    
    
   
  </main>
    </>
   
    
  );
} 
