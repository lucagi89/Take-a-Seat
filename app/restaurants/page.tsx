
import  fetchRestaurants from "../../lib/data";
import Link from "next/link";
import RestaurantCard from "../components/RestaurantCard";
// import RestaurantFloorplan from "./components/RestaurantFloorplan";
import { Restaurant } from "./../../types/data-types";



export default async function Restaurants() {
  const restaurants: Restaurant[] = await fetchRestaurants();

  return (
    <>
      <h1>Restaurants</h1>
      <p>Welcome to the restaurants page</p>
      <ul>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>
      <Link href="/">
        Back to Home Page
      </Link>
    </>
  );
}
