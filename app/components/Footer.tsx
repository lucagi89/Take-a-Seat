'use client';
import React, { use, useState } from 'react';
import styles from '../ui/footer.module.css'; // Add your CSS here
import { useAuth } from '../../hooks/useAuth'
import { auth, db } from '../../lib/firebase.config';
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const closeMenu = (): void => setIsMenuOpen(false);
  const user = auth.currentUser;

  const getUser = async () => {
    const q = query(collection(db, 'users'), where('email', '==', user.email));
    // const q = query(usersRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      return doc.data()
    });

  }
  const userData = getUser()
  const userName = userData?.firstName

  // const q = query(usersRef, where("email", "==", user.email));
  // const getUser = async () => {
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // console.log(doc.id, " => ", doc.data());
  //     console.log('yooo')
  //   });
  // }
  // console.log(user.email)

  return (
    <>
      {/* Footer with the Menu Button */}
      <footer className={styles.footer}>
        <button onClick={toggleMenu} className={styles.menuButton}>
          ⇧
        </button>
      </footer>

      {/* Overlay */}
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

      {/* Sliding Menu */}
      <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}>
        <button onClick={closeMenu} className={styles.closeButton}>
          X
        </button>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>Hello {userName}!</li>
            <li><button onClick={async () => logout()}>Sign out</button></li>
          </ul>
        </nav>
      </div>
    </>
  );
};
