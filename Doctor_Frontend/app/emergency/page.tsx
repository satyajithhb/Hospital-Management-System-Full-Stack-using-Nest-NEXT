"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Session from '../components/session';

export default function ReferAppointment() {
  const router = useRouter();
  const [appointmentId, setAppointmentId] = useState('');
  const [newDoctorId, setNewDoctorId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.patch(
          `http://localhost:8000/doctor/refer_appointment/${appointmentId}/${newDoctorId}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        router.push('/appointments');
      } else {
        router.push('/signin');
      }
    } catch (error) {
      setError('Error referring appointment. Please try again.');
      console.error('Error referring appointment:', error);
    }
  };

  return (
    <>
      <Session />
      <div className="max-w-md mx-auto mt-8">
        <div className="container mx-auto my-8">
          <h1 className="text-2xl font-bold mb-4">Refer Appointment</h1>
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
              <label htmlFor="newDoctorId" className="block font-medium">
                New Doctor ID:
              </label>
              <input
                type="number"
                id="newDoctorId"
                value={newDoctorId}
                onChange={(e) => setNewDoctorId(e.target.value)}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="bg-custom-dark-green text-black px-6 py-2 rounded-md hover:bg-green-600"
            >
              Refer Appointment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
