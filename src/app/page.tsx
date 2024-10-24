import Image from "next/image";
import styles from "./ui/home.module.css"

export default function Home() {
  return (
    <div className="main">
      <h1 className={styles.home}>Take a Seat</h1>
      <p>Don`t feel left out anymore </p>
      <Image
        src="/images/take-a-seat.jpg"
        alt="seat"
        width={500}
        height={500}
      />
    </div>
  );
}
