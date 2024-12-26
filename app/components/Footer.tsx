'use client';
import React, { useEffect, useState } from 'react';
import styles from '../ui/footer.module.css'; // Add your CSS here
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebase.config';
import Link from 'next/link';

export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null); // State to hold fetched user data
  const { logout } = useAuth();

  const user = auth.currentUser;
  const email = user?.email; // Ensure email is only accessed if user is not null

  // Toggle menu functions
  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const closeMenu = (): void => setIsMenuOpen(false);

  // Fetch user data effect
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

  // If the user is not authenticated, don't render the footer
  if (!user) {
    return null;
  }

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
            <li>
              {userData ? (
                <>Hello, {userData.firstName || email}!</>
              ) : (
                <>Hello, {email}!</>
              )}
            </li>
            <li><Link href='/profile'>Profile</Link></li>
            <li>
              <button onClick={async () => logout()}>Sign out</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
