"use client"
import { useEffect } from 'react';

export default function SessionCheck () {
  

  useEffect(() => {
    const session = localStorage.getItem('email');
    if (!session) {
      window.location.href = './SignIn';
    }
  }, []);

  return null;
};