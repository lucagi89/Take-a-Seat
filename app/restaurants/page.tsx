import Link from "next/link";


export default async function Restaurants() {
  const response = await fetch("@/src/app/api/restaurants", {
    method: 'GET', // Set the method here
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Check if the response is successful
  if (!response.ok) {
    // Handle error
    console.error('Failed to fetch data:', response.statusText);
    return <div>Error loading restaurants.</div>;
  }

  // Type the data as an array of restaurants (replace this with actual data structure)
  const data: any[] = await response.json();

  console.log(data);

  return (
    <div>
      <h1>Restaurants</h1>
      <p>Welcome to the restaurants page</p>
      <Link href="/">
        Home Page
      </Link>
    </div>
  );
}
