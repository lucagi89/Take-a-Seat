'use client';
import React, { useEffect, useState } from 'react';

// import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebase.config';
import { useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';


export default function ProfilePage() {
  const { user, loading, userData } = useAuth();
  const email = user?.email;
  interface UserData {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
  }



    console.log( userData);

  return (
    <div>
      <h1>Profile</h1>
      <p>This is my profile page</p>
      <ul>
        <li>Name: {userData?.firstName}</li>
        <li>Last Name: {userData?.lastName}</li>
        <li>Address: {userData?.streetAddress}</li>
        <li>Email: {userData?.email}</li>

      </ul>
    </div>
  );
}
