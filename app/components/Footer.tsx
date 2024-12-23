'use client';
import React, { use, useState } from 'react';
import styles from '../ui/footer.module.css'; // Add your CSS here
import { useAuth } from '../../hooks/useAuth'
import { auth, usersRef } from '../../lib/firebase.config';
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { logout } = useAuth();
  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const closeMenu = (): void => setIsMenuOpen(false);
  // const user = auth.currentUser;
  // const q = query(usersRef, where("email", "==", user.email));
  // const userData = usersRef.map
  // console.log(userData);


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
            <li><button onClick={closeMenu}>Close</button></li>
            <li><button onClick={async () => logout()}>Sign out</button></li>
          </ul>
        </nav>
      </div>
    </>
  );
};
