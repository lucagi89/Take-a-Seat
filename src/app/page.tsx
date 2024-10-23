import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Take a Seat</h1>
      <p>Don`&apos t feel left out anymore </p>
      <Image
        src="../images/main-foto.avif"
        alt="restaurant party for take a seat"
        width={500}
        height={500}
      />
    </>
  );
}
