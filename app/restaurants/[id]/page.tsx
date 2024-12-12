// app/restaurants/[id]/page.tsx
import Link from 'next/link';
import { getRestaurantData } from "../../../lib/data";
import RestaurantFloorplan from "./../components/RestaurantFloorplan";

type Props = {
  params: { id: number };
};

export default async function RestaurantPage({ params }: Props) {
  const { id } = params; // Await is NOT needed for params in Server Components

  // Fetch restaurant data based on the ID
  const restaurant = await getRestaurantData(id);

  return (
    <div>
      <h1>{restaurant?.name || "Unknown Restaurant"}</h1>
      <p>{restaurant?.description || "No description available."}</p>
      <RestaurantFloorplan restaurantId="1" isOwner={true}/>
      <Link href="/restaurants">Back to Restaurants</Link>
    </div>
  );
}
