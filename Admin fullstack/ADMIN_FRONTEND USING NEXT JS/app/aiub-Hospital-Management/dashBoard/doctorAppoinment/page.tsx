"use client"
import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "@/app/Component/Layout/defaultLayout";
import SessionCheck from "@/app/Component/sessioncheck";

export default function CreateDepartment() {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('Active');
  const [paitentAppionmentSerial, setPaitentAppionmentSerial] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userEmail =   localStorage.getItem('email');
  const token =  localStorage.getItem('token');

  const handleAppointmentDateChange = (e:any) => {
    setAppointmentDate(e.target.value);
  };

  const handleAppointmentTimeChange = (e:any) => {
    setAppointmentTime(e.target.value);
  };

  const handleAppointmentStatusChange = (e:any) => {
    setAppointmentStatus(e.target.value);
  };

  const handlePaitentAppionmentSerialChange = (e:any) => {
    setPaitentAppionmentSerial(e.target.value);
  };

  const handlePatientIdChange = (e:any) => {
    setPatientId(e.target.value);
  };

  const handleDoctorIdChange = (e:any) => {
    setDoctorId(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime || !paitentAppionmentSerial || !patientId || !doctorId) {
      setError('Please fill the form properly');
      return;
    }

    try {
      if (token) {
        const response = await axios.post(
          'http://localhost:3002/adminOperation/Appionment/${patientId}/${doctorId}',
          {
            appointmentDate,
            appointmentTime,
            appointmentStatus,
            paitentAppionmentSerial,
            
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('Appointment created successfully:', response.data);
        setSuccess('Appointment created successfully');
        setError('');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      setError('Failed to create appointment');
      setSuccess('');
    }
  };

  return (
    <>
        <SessionCheck/>
      <DefaultLayout>
        <div className="m-4 p-10">
          {error && (
            <p className="flex p-1 text-xl text-white justify-center bg-red-600">
              {error}
            </p>
          )}
          {success && (
            <p className="flex p-1 text-xl text-white justify-center bg-green-600">
              {success}
            </p>
          )}

          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-4xl font-medium text-gray-900 dark:text-white">
                Create Appointment
              </h1>
              <hr />
            </div>

            <div className="mb-5">
              <label
                htmlFor="appointmentDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Appointment Date
              </label>
              <input
                onChange={handleAppointmentDateChange}
                value={appointmentDate}
                type="date"
                id="appointmentDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="appointmentTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Appointment Time
              </label>
              <input
                onChange={handleAppointmentTimeChange}
                value={appointmentTime}
                type="time"
                id="appointmentTime"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="appointmentStatus"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Appointment Status
              </label>
              <select
                onChange={handleAppointmentStatusChange}
                value={appointmentStatus}
                id="appointmentStatus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Active">Active</option>
                
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="paitentAppionmentSerial"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Patient Appointment Serial
              </label>
              <input
                onChange={handlePaitentAppionmentSerialChange}
                value={paitentAppionmentSerial}
                type="text"
                id="paitentAppionmentSerial"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="patientId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Patient ID
              </label>
              <input
                onChange={handlePatientIdChange}
                value={patientId}
                type="text"
                id="patientId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="doctorId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Doctor ID
              </label>
              <input
                onChange={handleDoctorIdChange}
                value={doctorId}
                type="text"
                id="doctorId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-lime-400 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
}