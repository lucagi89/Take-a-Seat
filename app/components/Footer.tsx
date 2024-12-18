'use client';
import React, { useState } from 'react';
import styles from '../ui/footer.module.css'; // Add your CSS here

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Footer;
