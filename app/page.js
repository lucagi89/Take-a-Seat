'use client';
// import Image from "next/image";
import styles from "./ui/home.module.css"
import Link from "next/link";

// import { onAuthStateChangedListener } from './components/auth.js';
// import { useRouter } from 'next/router';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      {/* {user && <p>Welcome, {user.name}</p>} */}
      <Link href="/restaurants">
        Restaurants Page
      </Link>
    </div>
  );
}
