"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Session from '../components/session';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    doc_name: '',
    doc_address: '',
    doc_email: '',
    doc_phone: '',
    BDMC_certificate_no: '',
    NID_no: '',
    Degree: '',
    Specialism: '',
    Visiting_fee: 0,
    daily_appointment_time: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/doctor/myprofile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData(response.data);
          setUpdatedData(response.data);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/signin');
      }
    };

    fetchUserData();
  }, [router]);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Check if any field is empty, and if so, use the previous data
        const updatedDataWithPrevious: { [key: string]: any } = { ...updatedData };
        Object.keys(updatedData).forEach((key) => {
          if (updatedData[key as keyof typeof updatedData] === '') {
            if (userData) {
              updatedDataWithPrevious[key] = userData[key as keyof typeof userData];
            } else {
              // Handle the case where userData is null
              updatedDataWithPrevious[key] = '';
            }
          }
        });
  
        await axios.patch('http://localhost:8000/doctor/update_profile', updatedDataWithPrevious, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Profile updated successfully!');
        // Optionally, you can fetch updated user data here to reflect changes immediately
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Session />
      <Toaster />
      <div className="max-w-md mx-auto mt-8">
      <Link href="/uploadprofilepicture">
            <span className="hover:bg-blue-300 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
            Upload Profile Picture
            </span>
        </Link>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleUpdateProfile();
      }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Your Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         type="text" name="doc_name" value={updatedData.doc_name} onChange={handleChange} placeholder="Name" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Your Address</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="doc_address" value={updatedData.doc_address} onChange={handleChange} placeholder="Address" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Your Email</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="email" name="doc_email" value={updatedData.doc_email} onChange={handleChange} placeholder="Email" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Your Phone</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="doc_phone" value={updatedData.doc_phone} onChange={handleChange} placeholder="Phone" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">BDMC certificate no</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="BDMC_certificate_no" value={updatedData.BDMC_certificate_no} onChange={handleChange} placeholder="BDMC certificate no" />
        </div>
        
        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">NID no</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="NID_no" value={updatedData.NID_no} onChange={handleChange} placeholder="NID no" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Your Degree</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="Degree" value={updatedData.Degree} onChange={handleChange} placeholder="Degree" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Specialism</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="Specialism" value={updatedData.Specialism} onChange={handleChange} placeholder="Specialism" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Visiting fee</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="Visiting_fee" value={updatedData.Visiting_fee} onChange={handleChange} placeholder="Visiting fee" />
        </div>

        <div className="mb-4">
        <label htmlFor="doc_name" className="block text-gray-700 font-bold mb-2">Daily appointment time</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="daily_appointment_time" value={updatedData.daily_appointment_time} onChange={handleChange} placeholder="Daily appointment time" />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Update Profile
        </button>
        {/* <Link href="/updatepassword">
            <span className="hover:bg-red-300 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
            Change Password
            </span>
        </Link> */}
      </form>
      </div>
    </>
  );
}