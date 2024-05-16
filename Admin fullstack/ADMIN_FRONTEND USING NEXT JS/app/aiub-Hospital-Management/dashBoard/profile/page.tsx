"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/app/Component/Layout/defaultLayout";
import SessionCheck from "@/app/Component/sessioncheck";

interface Profile {
  name: string;
  email: string;
  gender: string;
}

const AdminProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const userEmail = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:3002/admin/deleteAdminProfile/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setDeleteSuccess(true);

      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting profile:', error);
      // Handle error - perhaps show an error message to the user
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const profileResponse = await axios.get(`http://localhost:3002/admin/adminProfile/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const imageResponse = await axios.get(`http://localhost:3002/admin/getimagebyemail/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        });

        setProfile(profileResponse.data);
        setImageFile(URL.createObjectURL(imageResponse.data));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <><SessionCheck />
    <DefaultLayout>
      {profile && imageFile && (
        <div className="profile-card bg-slate-400">
          <div className="p-4">Admin Profile</div>
          <div className="profile-image" style={{ backgroundImage: `url(${imageFile})` }}></div>
          <div className="profile-details">
            <h5 className="profile-name">{profile.name}</h5>
            <p className="profile-email">{profile.email}</p>
            <p className="profile-gender">{profile.gender}</p>
          </div>
          <div className="flex mt-4 md:mt-6 gap-8">
            <a href="/aiub-Hospital-Management/dashBoard/UpdateAdmin" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</a>
            <div>
              {deleteSuccess ? (
                <p className="text-green-500">Profile deleted successfully!</p>
              ) : (
                <button
                  className="text-white bg-lime-400 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Profile'}
                </button>
              )}
            </div>
          </div>
          <div className="p-4"></div>
        </div>
      )}
    </DefaultLayout></>
  );
};

export default AdminProfile;
