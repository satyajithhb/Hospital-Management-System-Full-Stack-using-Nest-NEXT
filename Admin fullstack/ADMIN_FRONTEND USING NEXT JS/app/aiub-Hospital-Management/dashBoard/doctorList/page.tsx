"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/app/Component/Layout/defaultLayout';
import SessionCheck from '@/app/Component/sessioncheck';

interface Doctor {
  DepartmentId: any;
  depname: string;
  createDate: string;
  DoctorId:any;
  DoctorName:any;
  email:any;
  maxcheckPaitent:any;
  phone:any;
}

export default function DoctorList() {
  const [departments, setdoctors] = useState<Doctor[]>([]);
  const [searchId, setSearchId] = useState('');
  const userEmail =   localStorage.getItem('email');
  const token =   localStorage.getItem('token');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3002/adminOperation/viewDoctor/${searchId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        if (response.data && response.data.success && response.data.data) {
          const doctorData = response.data.data;

          const mappedDoctor: Doctor = {
            DoctorId: doctorData.Doctorid,
            DoctorName: doctorData.doctorName,
            email: doctorData.email,
            maxcheckPaitent: doctorData.maxCheekUpPaitent,
            phone: doctorData.phone,
            DepartmentId: undefined,
            depname: '',
            createDate: ''
          };
          // Set the doctor data in state
          setdoctors([mappedDoctor]);
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching department list:', error);
        // Handle errors here
      }
    }

    fetchData();
  }, [searchId, token]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchId) {
      console.error('No data found');

      return;
    }
  };

  return (
    <>
        <SessionCheck/>
      <DefaultLayout>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" onChange={handleSearchChange} value={searchId} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search doctor by id"  />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        <div className='m-5'>

        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
              <tr>
               
                <th scope="col" className="px-6 py-3">
                  DoctorId
                </th>
                <th scope="col" className="px-6 py-3">
                  DoctorName
                </th>
                <th scope="col" className="px-6 py-3">
                  MaxcheckUpPaitent
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  email
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700'}>
                
                  <td className="px-6 py-4 whitespace-nowrap">{department.DoctorId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{department.DoctorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{department.maxcheckPaitent}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{department.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{department.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DefaultLayout>
    </>
  );
}
