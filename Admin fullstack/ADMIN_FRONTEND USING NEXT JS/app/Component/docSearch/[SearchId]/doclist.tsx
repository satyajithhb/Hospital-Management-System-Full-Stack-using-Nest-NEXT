// app/aiub-Hospital-Management/dashBoard/docSearch/[searchId]/DoctorList.tsx
"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Doctor {
  DepartmentId: any;
  depname: string;
  createDate: string;
  DoctorId: any;
  DoctorName: any;
  email: any;
  maxcheckPaitent: any;
  phone: any;
}

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchId, setSearchId] = useState('');
  const userEmail = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const router = useRouter();

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
            DepartmentId: undefined,
            depname: '',
            createDate: '',
            DoctorId: doctorData.Doctorid,
            DoctorName: doctorData.doctorName,
            email: doctorData.email,
            maxcheckPaitent: doctorData.maxCheekUpPaitent,
            phone: doctorData.phone
          };

          setDoctors([mappedDoctor]);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    }

    if (searchId) {
      fetchData();
    }
  }, [searchId, token]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchId) {
      console.error('No data found');
      return;
    }
    router.push(`/docSearch/${searchId}`); // Redirect to dynamic route with searchId
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchId} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Create Date</th>
            <th>Doctor ID</th>
            <th>Doctor Name</th>
            <th>Email</th>
            <th>Max Check-up Patients</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.DepartmentId}</td>
              <td>{doctor.depname}</td>
              <td>{doctor.createDate}</td>
              <td>{doctor.DoctorId}</td>
              <td>{doctor.DoctorName}</td>
              <td>{doctor.email}</td>
              <td>{doctor.maxcheckPaitent}</td>
              <td>{doctor.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}