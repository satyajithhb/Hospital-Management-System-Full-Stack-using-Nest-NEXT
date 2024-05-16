"use client"
import React, { useEffect, useState } from "react";
import Dashboard from "../FirstPage_dashboard/page";
import img from '/public/images.png';
import Image from "next/image";
import axios from "axios";


const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const userEmail =   localStorage.getItem('email');
  const token =   localStorage.getItem('token');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleSignOut = async (event:any) => {
        event.preventDefault();
        try {
          
            sessionStorage.removeItem('email');
          
            window.location.href = './SignIn';
          } catch (error) {
            console.error(error)
          }
    
  };



    useEffect(() => {
        if (typeof window !== 'undefined')// checks if the code is running on the client-side and not on the server-side.
        {
            const session = localStorage.getItem('email');
                   
        }
     
    }, []);

  return (
    <>


<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-70 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <a href="/aiub-Hospital-Management/dashBoard" className="flex items-center ps-2.5 mb-5">
         <Image src={img} className="h-6 me-3 sm:h-7" alt="Logo" width={30} height={40}></Image>
         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Aiub Hospital Management</span>
      </a>
      <ul className="space-y-2 font-medium">
        
         <li>
         <div className='w-full py-7 pb-8'>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="px-24 py-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    Admin Operation <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                   <div className="origin-top absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5" style={{ zIndex: 9999 }}>
                   <ul role="menu">
                            <li>
                                <a
                                    href="/aiub-Hospital-Management/Create-Department"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Create DepartMent
                                </a>
                            </li>
                        
                            <li>
                                <a
                                    href="/aiub-Hospital-Management/dashBoard/AdmitPaitent"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Admit Paitent
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/aiub-Hospital-Management/dashBoard/DischargePaitent"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Discharge Paitent
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/aiub-Hospital-Management/dashBoard/PaitentInfo"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Paitent info
                                </a>
                            </li>

                           
                        </ul>
                    </div>
                )}
            </div>
        </div>

         </li>


         <div className='w-full py-6 pb-8'>
          <div className="relative inline-block">          
         <li>
         <a href="/aiub-Hospital-Management/dashBoard/doctorAppoinment" className=" p-9 py-4 bg-blue-700 text-gray-900 rounded-lg dark:text-white hover:bg-blue-950 dark:hover:bg-gray-700 group">
               
               <span className=" text-white">Appiont with Doctor&Paitent </span>
            </a>
         </li>
         </div>
         </div>

          <div className='w-full py-0 pb-8'>
          <div className="relative inline-block">          
         <li>
         <a href="/aiub-Hospital-Management/dashBoard/SearchDoctorAppionment" className=" p-9 py-4 bg-blue-700 text-gray-900 rounded-lg dark:text-white hover:bg-blue-950 dark:hover:bg-gray-700 group">
               
               <span className="text-white">Search Doctor Appionment </span>
            </a>
         </li>
         </div>
         </div>
         <div className='w-full py-0 pb-8'>
          <div className="relative inline-block">          
         <li>
        <a href="/aiub-Hospital-Management/dashBoard/AssigndoctorIndep" className=" p-8 py-4 bg-blue-700 text-gray-900 rounded-lg dark:text-white hover:bg-blue-950 dark:hover:bg-gray-700 group">
               
               <span className="ms-4 text-white">DoctorAssign in Department</span>
            </a>
         </li>
         </div>
         </div>

         <div className='w-full py-0 pb-8'>
          <div className="relative inline-block">          
         <li>
         <a href="/aiub-Hospital-Management/dashBoard/department" className=" px-10 py-4 bg-blue-700 text-gray-900 rounded-lg dark:text-white hover:bg-blue-950 dark:hover:bg-gray-700 group">
               
               <span className="ms-4 text-white">Department List</span>
            </a>
         </li>
         </div>
         </div>

         <div className='w-full py-0 pb-8'>
          <div className="relative inline-block">          
         <li>
         <a href="/aiub-Hospital-Management/dashBoard/doctorList" className=" px-10 py-4 bg-blue-700 text-gray-900 rounded-lg dark:text-white hover:bg-blue-950 dark:hover:bg-gray-700 group">
               
               <span className="ms-4 text-white">Search Doctor</span>
            </a>
         </li>
         </div>
         </div>

         <div className='w-full py-0 pb-8'>
          <div className="relative inline-block">          
         <li>
         <button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSignOut}>Sign out</button>
         </li>
         </div>
         </div>

      
        

      </ul>
   </div>


   


</aside>






<div className="p-4 sm:ml-80">
  
</div>



  
   
    </>
  );
};


export default Sidebar;