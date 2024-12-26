'use client';
import React, { useEffect, useState } from 'react';

// import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebase.config';

export default function ProfilePage() {
  const user = auth.currentUser;
  const email = user?.email;
  const [userData, setUserData] = useState<any>(null); // State to hold fetched user data

    // Fetch user


  useEffect(() => {
      if (!email) return;

      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/users/${encodeURIComponent(email)}`);

          if (!response.ok) {
            console.error('Error fetching user:', response.status, response.statusText);
            return;
          }

          const data = await response.json();
          setUserData(data); // Store the fetched user data in state
          console.log('Fetched user:', data);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error fetching user:', error.message);
          } else {
            console.error('Error fetching user:', error);
          }
        }
      };

      fetchUser();
    }, [email]); // Depend on email to fetch user data when it changes


  return (
    <div>
      <h1>Profile</h1>
      <p>This is my profile page</p>
      {/* <ul>
        <li>Name: {user?.firstName}</li>
        <li>Last Name: {user?.lastName}</li>
        <li>Address: {user?.address}</li>
        <li>Email: {user?.email}</li>

      </ul> */}

      <p>User Data: {JSON.stringify(userData)}</p>
    </div>
  );
}
