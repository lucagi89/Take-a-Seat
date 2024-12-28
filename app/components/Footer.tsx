'use client';

import React, { useState } from 'react';
import styles from '../ui/footer.module.css';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, userData, error } = useAuth();

  // Toggle menu functions
  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);
  const closeMenu = (): void => setIsMenuOpen(false);

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
                <>Hello, {userData.firstName || userData.email || 'Guest'}!</>
              ) : (
                <>Hello, Guest!</>
              )}
            </li>
            {error && <li className={styles.error}>Error: {error}</li>}
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  try {
                    await logout();
                    closeMenu(); // Close menu after successful logout
                  } catch (err) {
                    console.error('Logout failed:', err);
                  }
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
