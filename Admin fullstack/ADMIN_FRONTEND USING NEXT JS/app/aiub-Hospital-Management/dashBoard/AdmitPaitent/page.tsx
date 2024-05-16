"use client"
import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "@/app/Component/Layout/defaultLayout";
import SessionCheck from "@/app/Component/sessioncheck";

export default function CreateDepartment() {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userEmail =   localStorage.getItem('email');
  const token =   localStorage.getItem('token');

  const handlePatientNameChange = (e:any) => {
    setPatientName(e.target.value);
  };

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handleAdmissionDateChange = (e:any) => {
    setAdmissionDate(e.target.value);
  };

  const handlePhoneChange = (e:any) => {
    setPhone(e.target.value);
  };

  const handleGenderChange = (e:any) => {
    setGender(e.target.value);
  };

  const handleStatusChange = (e:any) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!patientName || !email || !admissionDate || !phone || !gender || !status) {
      setError('Please fill the form properly');
      return;
    }

    try {
      if (token) {
        const response = await axios.post(
          'http://localhost:3002/adminOperation/admitPaitent',
          {
            patientName,
            email,
            admissionDate,
            phone,
            gender,
            status
          },
         
        );

        console.log('Admit paitent successfully:', response.data);
        setSuccess('Admit Paitent successfully');
        setError('');
      }
    } catch (error) {
      console.error('Faied to Admit paitent:', error);
      console.log(userEmail)
      console.log(token)
      setError('Failed to Admit paitent');
      setSuccess('');
    }
  };

  return (
    <>
      <SessionCheck></SessionCheck>
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

          <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-4xl font-medium text-gray-900 dark:text-white">
               Admit Paitent
              </h1>
              <hr />
            </div>

            <div className="mb-5">
              <label
                htmlFor="patientName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Patient Name
              </label>
              <input
                onChange={handlePatientNameChange}
                value={patientName}
                type="text"
                id="patientName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                onChange={handleEmailChange}
                value={email}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="admissionDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Admission Date
              </label>
              <input
                onChange={handleAdmissionDateChange}
                value={admissionDate}
                type="date"
                id="admissionDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                onChange={handlePhoneChange}
                value={phone}
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                onChange={handleGenderChange}
                value={gender}
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">Other</option>
              </select>
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
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="male">admit</option>
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
