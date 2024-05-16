"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Session from '../components/session';
import Link from 'next/link';

export default function DoctorPrescriptions() {
  const router = useRouter();
  const [prescriptionsData, setPrescriptionsData] = useState<any>(null);

  useEffect(() => {
    const fetchPrescriptionsData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/doctor/prescriptions', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPrescriptionsData(response.data);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error fetching prescriptions data:', error);
        router.push('/signin');
      }
    };

    fetchPrescriptionsData();
  }, [router]);

  if (!prescriptionsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Session />
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Your Prescriptions
      <Link href="/prescribe">
        <span className="hover:bg-green-200 px-3 py-2 rounded-md text-sm cursor-pointer">
        Write Prescriptions
        </span>
      </Link></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prescriptionsData.map((prescription: any) => (
            <div key={prescription.id} className="card bg-red-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Prescription Info</h2>
                <p>Prescription ID: {prescription.id}</p>
                <p>Appointment ID: {prescription.appointment.id}</p>
                <p>Medication: {prescription.prescription_text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}