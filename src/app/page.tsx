"use client";
import Image from "next/image";
import styles from "./ui/home.module.css"
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../lib/firebase.js';

export default function Home() {
  const [users, setUsers] = useState<{ id: string; name: string; lastName: string }[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getDocs(collection(db, "users"));
  //     setUsers(data.docs.map((doc) => ({
  //       id: doc.id,
  //       name: doc.data().first_name,
  //       lastName: doc.data().last_name
  //     })));
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="main">
      <h1 className={styles.home}>Take a Seat</h1>
      <p>Don`t feel left out anymore </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}   {user.lastName}</li>
        ))}
      </ul>
      <Image
        src="/images/take-a-seat.jpg"
        alt="seat"
        width={500}
        height={500}
      />
    </div>
  );
}
