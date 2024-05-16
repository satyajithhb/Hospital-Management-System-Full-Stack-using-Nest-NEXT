"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  doc_name: string;
  doc_address: string;
  doc_email: string;
  doc_phone: string;
  BDMC_certificate_no: string;
  NID_no: string;
  Degree: string;
  Specialism: string;
  Visiting_fee: number;
  daily_appointment_time: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    doc_name: '',
    doc_address: '',
    doc_email: '',
    doc_phone: '',
    BDMC_certificate_no: '',
    NID_no: '',
    Degree: '',
    Specialism: '',
    Visiting_fee: 500,
    daily_appointment_time: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/auth/register', formData);
        toast.success('Signup successful!');
        router.push('/signin');
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'Visiting_fee' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: '' });
  };  
   
  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.doc_name) {
      errors.doc_name = 'Doctor name is required';
    }

    if (!formData.doc_email) {
      errors.doc_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.doc_email)) {
      errors.doc_email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (!formData.doc_address) {
      errors.doc_address = 'Address is required';
    }

    if (!formData.BDMC_certificate_no) {
      errors.BDMC_certificate_no = 'BDMC certificate number is required';
    }

    if (!formData.NID_no) {
      errors.NID_no = 'NID number is required';
    }

    if (!formData.Degree) {
      errors.Degree = 'Degree is required';
    }

    if (!formData.Specialism) {
      errors.Specialism = 'Specialism is required';
    }


    if (!formData.doc_phone) {
      errors.doc_phone = 'Phone number is required';
    } else if (!/^\d{11}$/.test(formData.doc_phone)) {
      errors.doc_phone = 'Phone number must be 11 digits';
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Doctor Sign Up</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
            <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">
              Doctor Name
            </label>
            <input
              type="text"
              id="doc_name"
              name="doc_name"
              value={formData.doc_name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.doc_name && <p className="text-red-500 text-xs italic">{errors.doc_name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="doc_address" className="block text-gray-700 font-bold mb-2">
              Doctor Address
            </label>
            <input
              type="text"
              id="doc_address"
              name="doc_address"
              value={formData.doc_address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.doc_address && <p className="text-red-500 text-xs italic">{errors.doc_address}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="doc_email" className="block text-gray-700 font-bold mb-2">
              Doctor Email
            </label>
            <input
              type="email"
              id="doc_email"
              name="doc_email"
              value={formData.doc_email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.doc_email && <p className="text-red-500 text-xs italic">{errors.doc_email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="doc_phone" className="block text-gray-700 font-bold mb-2">
              Doctor Phone
            </label>
            <input
              type="text"
              id="doc_phone"
              name="doc_phone"
              value={formData.doc_phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.doc_phone && <p className="text-red-500 text-xs italic">{errors.doc_phone}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="BDMC_certificate_no" className="block text-gray-700 font-bold mb-2">
              BDMC Certificate Number
            </label>
            <input
              type="text"
              id="BDMC_certificate_no"
              name="BDMC_certificate_no"
              value={formData.BDMC_certificate_no}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.BDMC_certificate_no && <p className="text-red-500 text-xs italic">{errors.BDMC_certificate_no}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="NID_no" className="block text-gray-700 font-bold mb-2">
              NID Number
            </label>
            <input
              type="text"
              id="NID_no"
              name="NID_no"
              value={formData.NID_no}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.NID_no && <p className="text-red-500 text-xs italic">{errors.NID_no}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Degree" className="block text-gray-700 font-bold mb-2">
              Degree
            </label>
            <input
              type="text"
              id="Degree"
              name="Degree"
              value={formData.Degree}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.Degree && <p className="text-red-500 text-xs italic">{errors.Degree}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Specialism" className="block text-gray-700 font-bold mb-2">
              Specialism
            </label>
            <input
              type="text"
              id="Specialism"
              name="Specialism"
              value={formData.Specialism}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.Specialism && <p className="text-red-500 text-xs italic">{errors.Specialism}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Visiting_fee" className="block text-gray-700 font-bold mb-2">
              Visiting Fee
            </label>
            <input
              type="number"
              id="Visiting_fee"
              name="Visiting_fee"
              value={formData.Visiting_fee.toString()}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.Visiting_fee && <p className="text-red-500 text-xs italic">{errors.Visiting_fee}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="daily_appointment_time" className="block text-gray-700 font-bold mb-2">
              Daily Appointment Time
            </label>
            <input
              type="text"
              id="daily_appointment_time"
              name="daily_appointment_time"
              value={formData.daily_appointment_time}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.daily_appointment_time && <p className="text-red-500 text-xs italic">{errors.daily_appointment_time}</p>}
          </div>
          <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
