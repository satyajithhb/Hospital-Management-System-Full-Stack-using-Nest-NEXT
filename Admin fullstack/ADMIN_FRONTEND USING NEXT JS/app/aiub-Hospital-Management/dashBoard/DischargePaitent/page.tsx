"use client"
import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "@/app/Component/Layout/defaultLayout";
import SessionCheck from "@/app/Component/sessioncheck";

export default function Discharge() {
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('discharge');
  const [dischargeDate, setDischargeDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userEmail =   localStorage.getItem('email');
  const token =   localStorage.getItem('token');

  const handleStatusChange = (e:any) => {
    setStatus(e.target.value);
  };

  const handleDischargeDateChange = (e:any) => {
    setDischargeDate(e.target.value);
  };

  const handlePatientIdChange = (e:any) => {
    setPatientId(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!patientId || !dischargeDate) {
      setError('Please fill the form properly');
      return;
    }

    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:3002/adminOperation/dischargePatient/${patientId}`,
          {
            status,
            dischargeDate
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('Patient Discharged successfully:', response.data);
        setSuccess('Patient Discharged successfully');
        setError('');
      }
    } catch (error) {
      console.error('Error Patient Discharged:', error);
      console.log(userEmail)
      console.log(token)
      setError('Failed to Discharge Patient');
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
               Discharge Patient
              </h1>
              <hr />
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
                htmlFor="dischargeDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Discharge Date
              </label>
              <input
                onChange={handleDischargeDateChange}
                value={dischargeDate}
                type="date"
                id="dischargeDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Status
              </label>
              <select
                onChange={handleStatusChange}
                value={status}
                id="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="discharge">Discharge</option>
              </select>
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
