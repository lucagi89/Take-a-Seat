// app/restaurants/[id]/page.tsx
import Link from 'next/link';
import { getRestaurantData } from "../../../lib/data";
import { Metadata } from 'next';

type Params = {
  name: string;
};

// Dynamically generate metadata for the restaurant page
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { name } = await params; // Await the params if it's a promise
  return {
    title: `Restaurant: ${name}`,
  };
}

export default async function RestaurantPage({ params }: { params: Promise<Params> }) {
  console.log("params received:", params);
  const { name } = await params; // Await the params to destructure the name property
  console.log("Restaurant name:", name);
  // Fetch restaurant data based on the ID
  const restaurant = await getRestaurantData(name);

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div>
      <h1>{restaurant?.name || "Unknown Restaurant"}</h1>
      <p>{restaurant?.description || "No description available."}</p>

      <Link href="/">Back to The map</Link>
    </div>
  );

}
