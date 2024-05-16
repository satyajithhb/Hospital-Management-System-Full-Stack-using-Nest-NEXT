"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Session from '../components/session';

export default function WritePrescription() {
  const router = useRouter();
  const [appointmentId, setAppointmentId] = useState('');
  const [medicine, setMedicine] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(
          `http://localhost:8000/doctor/prescribe/${appointmentId}`,
          { medicine },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        router.push('/prescriptions');
      } else {
        router.push('/signin');
      }
    } catch (error) {
      setError('Error prescribing medicine. Please try again.');
      console.error('Error prescribing medicine:', error);
    }
  };

  return (
    <>
      <Session />
      <div className="max-w-md mx-auto mt-8">
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Write Prescription</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="appointmentId" className="block font-medium">
              Appointment ID:
            </label>
            <input
              type="number"
              id="appointmentId"
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="medicine" className="block font-medium">
              Medicine:
            </label>
            <textarea
              id="medicine"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="bg-custom-dark-green text-black px-6 py-2 rounded-md hover:bg-green-600"
          >
            Prescribe Medicine
          </button>
        </form>
      </div>
      </div>
    </>
  );
}
