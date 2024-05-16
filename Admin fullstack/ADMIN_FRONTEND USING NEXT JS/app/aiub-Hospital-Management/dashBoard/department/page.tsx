"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/app/Component/Layout/defaultLayout';
import SessionCheck from '@/app/Component/sessioncheck';

interface Department {
  DepartmentId:any;
  depname: string;
  createDate: string;
  // Add more properties as needed
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const userEmail =  localStorage.getItem('email');
  const token =   localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3002/adminOperation/ViewDeparment', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Assuming the response data is an array of departments
        setDepartments(response.data.map((department: any) => ({
          DepartmentId: department.depId,
          depname: department.depName,
          createDate: department.date,
          // Map other properties as needed
        })));
      } catch (error) {
        console.error('Error fetching department list:', error);
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
                DepartmentId
              </th>
              <th scope="col" className="px-6 py-3">
                Department Name
              </th>
              <th scope="col" className="px-6 py-3">
                Createdate
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700'}>
                <td className="px-6 py-4 whitespace-nowrap">{department.DepartmentId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{department.depname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{department.createDate}</td>
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
