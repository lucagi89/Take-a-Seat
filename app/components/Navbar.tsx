import Image from "next/image";
import Link from "next/link";
import styles from "/Users/lucagattamelata/take-a-seat/app/ui/navbar.module.css";


export default function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <Link href="/" className={styles.imageContainer}>
        <Image
        src="/logo.png"
        alt="Take a Seat"

        className={styles.image}
      />
      </Link>
      <div className={styles.links}>
        <Link href="/restaurants">
        Restaurants
        </Link>
      </div>
    </nav>
  );
}
