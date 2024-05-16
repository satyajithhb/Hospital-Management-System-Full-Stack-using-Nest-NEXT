"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";
import { CiStethoscope } from "react-icons/ci";

interface User {
  doc_name: string;
  profile_photo: string;
}

export default function Session() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/doctor/myprofile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div></div>;
  }

  if (!user) {
    return <div></div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/../signin');
  };

  return (<>
  <nav className="bg-custombg text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
        <div className="flex-none">
          <div className="w-20 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={'http://localhost:8000/auth/photo/'+user.profile_photo} />
          </div>
        </div>
          <div className="flex items-center">
            <CiStethoscope size={30} className="text-signup-bg mx-5" />
            <Link href="/profile">
              <span className="text-xl font-bold cursor-pointer">
              <a className="btn btn-ghost text-xl">Hello, {user.doc_name}</a>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-10 ml-10 ">
              <Link href="/dashboard">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Dashboard
                </span>
              </Link>
              <Link href="/appointments">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Appointments
                </span>
              </Link>
              <Link href="/prescriptions">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Prescriptions
                </span>
              </Link>
              <Link href="/emergency">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Emergency
                </span>
              </Link>
              <Link href="/updatepassword">
                <span className="hover:bg-custom-dark-green px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Change Password
                </span>
              </Link>
              <button className="bg-blue-300 hover:bg-red-300 font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>);
}
