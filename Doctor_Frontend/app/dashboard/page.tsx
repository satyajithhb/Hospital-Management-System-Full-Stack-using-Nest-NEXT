"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Session from '../components/session';
import UserCard from '../components/usercard';

export default function Dashboard() {
  const [earnings, setEarnings] = useState<number | null>(null);
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/doctor');
        setDoctorData(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        toast.error('Error fetching doctor data');
      }
    };

    fetchDoctorData();
  }, []);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const earningsResponse = await axios.get('http://localhost:8000/doctor/earnings', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEarnings(earningsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching earnings:', error);
        toast.error('Error fetching earnings');
      }
    };

    fetchEarnings();
  }, []);

  return (
    <>
      <Session />
      <div className="justify-center py-5 px-4 sm:px-6 lg:px-8">
        <Toaster />
        {earnings !== null && (
          <div className="left-4 mb-4 p-2 bg-gray-500 text-white px-3 py-1 rounded-lg shadow-lg font-bold text-xl">Total Earnings: ${earnings}</div>
        )}
        <div className="grid grid-cols-3 gap-2">
          {doctorData.map((item: any, index: number) => (
            <div key={index}>
              <UserCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

