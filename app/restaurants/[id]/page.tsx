// app/restaurants/[id]/page.tsx
import { getRestaurantData } from "../../../lib/data";

type Props = {
  params: { id: string };
};

export default async function RestaurantPage({ params }: Props) {
  const { id } = params; // Await is NOT needed for params in Server Components

  // Fetch restaurant data based on the ID
  const restaurant = await getRestaurantData(id);

  return (
    <div>
      <h1>{restaurant?.name || "Unknown Restaurant"}</h1>
      <p>{restaurant?.description || "No description available."}</p>
      <a href="/restaurants">Back to Restaurants</a>
    </div>
  );
}
