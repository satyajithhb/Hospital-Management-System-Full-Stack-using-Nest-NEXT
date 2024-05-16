"use client"
import React, { useState } from "react";
import Layout from "@/app/layout";
import axios from "axios";
import DefaultLayout from "@/app/Component/Layout/defaultLayout";
import SessionCheck from "@/app/Component/sessioncheck";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const userEmail = localStorage.getItem('email');
  const token = localStorage.getItem('token');



  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  }


  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  }

  const handleNameChange = (e:any) => {
    setName(e.target.value);
  }

  const handleGenderChange = (e:any) => {
    setGender(e.target.value);
  }

  const handlePhoneChange = (e:any) => {
    setPhone(e.target.value);
  }

  const handleDateChange = (e:any) => {
    setDate(e.target.value);
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();

   

    try {
     

      const response = await axios.put(`http://localhost:3002/admin/updateadmin/${userEmail}`, {
        email:email,
        name: name,
        password: password,
        date: date,
        phone: phone,
        gender: gender
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('AdminProfile uodated successful:', response.data);
 
      setPassword('');
      setError("update SucessFull")
      window.location.href = './profile';
    } catch (error) {
      console.error('updatefailed:', error);
      setError('update failed. Please try again later.');
    }
  };





  return (
    <>
        <SessionCheck/>
    <DefaultLayout>
      {/* {error && alert(error)} */}
      <div >
       {error && <p className="flex p-1 text-xl text-zinc-50 justify-center bg-lime-800">{error}</p>}
       </div>
     
      <div className="flex p-40">
        
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <h1 className="font-extrabold bg-center text-3xl">Update admin Profile</h1>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleEmailChange} value={email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>


      <div className="relative z-0 w-full mb-5 group">
        <input
        onChange={handleNameChange} value={name}
          type="text"
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
         
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
    
          <div className="relative z-0 w-full mb-5 group">
      <input

        onChange={handlePasswordChange} value={password}
        type="password"
        name="password"
        id="password"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
       
      />
      <label
        htmlFor="password"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Password
      </label>
    </div>

    
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={handleDateChange} value={date}
          type="date"
          name="date"
          id="date"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
       
         
        />
        <label
          htmlFor="date"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Date
        </label>
      </div>
    </div>
    <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 w-full mb-5 group">
        <input
        onChange={handlePhoneChange} value={phone}
          type="tel"
          name="phone"
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
       
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <select
         onChange={handleGenderChange} value={gender}
          name="gender"
          id="gender"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label
          htmlFor="gender"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Gender
        </label>
      </div>
    </div>


          <button type="submit" className="text-white bg-lime-400 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </DefaultLayout>
       
    </>
  );
}
