"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Session from '../components/session';

export default function DoctorAppointments() {
  const router = useRouter();
  const [appointmentsData, setAppointmentsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/doctor/my_appointments', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAppointmentsData(response.data);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error fetching appointments data:', error);
        // Don't redirect on error, just set loading to false
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!appointmentsData || appointmentsData.appointments.length === 0) {
    return (
      <>
        <Session />
        <div className="container mx-auto my-8">
          <h1 className="text-2xl font-bold mb-4">No appointments available.</h1>
        </div>
      </>
    );
  }

  const { appointments } = appointmentsData;

  return (
    <>
      <Session />
      <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment: { id: React.Key | null | undefined; appointment_date: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; reason: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; patient: { patient_name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; patient_address: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }) => (
            <div key={appointment.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Appointment Info</h2>
                <p>Appointment ID: {appointment.id}</p>
                <p>Appointment Date: {appointment.appointment_date}</p>
                <p>Appointment Reason: {appointment.reason}</p>
                <p>Patient Name: {appointment.patient.patient_name}</p>
                <p>Patient Address: {appointment.patient.patient_address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
