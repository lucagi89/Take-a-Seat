import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Take a Seat</h1>
      <Image
        src="../images/main-foto.avif"
        alt="restaurant party"
        width={500}
        height={500}
      />
    </>
  );
}
