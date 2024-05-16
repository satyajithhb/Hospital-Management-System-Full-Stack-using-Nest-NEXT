"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Session from '../components/session';

export default function UploadProfilePhoto() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profile_photo', selectedFile);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:8000/auth/upload-profile-photo', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Profile photo uploaded successfully!');
      } else {
        toast.error('Please log in to upload a profile photo.');
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      toast.error('An error occurred while uploading the profile photo.');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <Session />
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded p-8">
          <h1 className="text-2xl font-bold mb-4">Upload Profile Photo</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Upload
          </button>
          <Toaster />
        </div>
      </div>
    </div>
  );
};