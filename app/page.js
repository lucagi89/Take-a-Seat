"use client";
// import Image from "next/image";
import styles from "./ui/home.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
// import { onAuthStateChangedListener } from './components/auth.js';
// import { useRouter } from 'next/router';

export default function Home() {
  // const router = useRouter();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   onAuthStateChangedListener((user) => {
  //     setUser(user);
  //     if (!user) {
  //       router.push('/login'); // Redirect to login if not authenticated
  //     }
  //   });
  // }, []);

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      {/* {user && <p>Welcome, {user.name}</p>} */}
      <Link href="/about">
        About Page
      </Link>
    </div>
  );
}


// import { useState, useEffect } from 'react';
// import { onAuthStateChangedListener } from './auth';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChangedListener((user) => {
//       setUser(user);
//     });
//   }, []);

//   return (
//     <Component {...pageProps} user={user} />
//   );
// }

// export default MyApp;
