"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/app/Component/Layout/defaultLayout';
import router from 'next/router';
import SessionCheck from '@/app/Component/sessioncheck';


interface Paitent {
  PaitentId:any;
  paitentName: string;
  email: string;
  admissionDate: string;
  dischargeDate: string;
  gender: string;
  status: string

}

export default function DepartmentList() {
  const [Patients, setPaitents] = useState<Paitent[]>([]);
  const userEmail =  localStorage.getItem('email');
  const token =   localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3002/adminOperation/allPaitentInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Assuming the response data is an array of departments
        setPaitents(response.data.map((paitent: any) => ({
          PaitentId: paitent. paitentid,
          paitentName:paitent. paitentName,
          email:paitent.email,
          admissionDate:paitent.admissionDate,
          dischargeDate: paitent.dischargeDate,
          gender:paitent.gender,
          status:paitent.status
         
        })));
      } catch (error) {
        console.error('Error fetching Paitent list:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
        <SessionCheck/>
      <DefaultLayout>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              PaitentId
              </th>
              <th scope="col" className="px-6 py-3">
              paitentName
              </th>
              <th scope="col" className="px-6 py-3">
              email
              </th>
              <th scope="col" className="px-6 py-3">
              admissionDate
              </th>
              <th scope="col" className="px-6 py-3">
              dischargeDate
              </th>
              <th scope="col" className="px-6 py-3">
              gender
              </th>
              <th scope="col" className="px-6 py-3">
              status
              </th>
              <th scope="col" className="px-6 py-3">
              Action
              </th>

            </tr>
          </thead>
          <tbody>
            {Patients.map((paitent, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700'}>
                <td className="px-6 py-4 whitespace-nowrap">{paitent.PaitentId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paitent.paitentName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paitent.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paitent.admissionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paitent.dischargeDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paitent.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{paitent.status}</td>
                
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
