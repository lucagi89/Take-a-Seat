import Link from "next/link";
import { getRestaurantData } from "../../../lib/data";

type Props = {
  params: { id: string };
};

export default async function RestaurantPage({ params }: Props) {
  const { id } = params;
  const restaurant = await getRestaurantData(id);

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <Link href="/restaurants">Back to Restaurants</Link>
    </div>
  );
}
