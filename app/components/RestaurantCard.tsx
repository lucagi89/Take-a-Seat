import Link from 'next/link';
import { Restaurant } from './../../types/data-types';


// type PartialRestaurant = Partial<Restaurant>

type RestaurantCardProps = {
  restaurant: Restaurant; // Ensure the type matches the `restaurant` object
};


export default function RestaurantCard({ restaurant }: RestaurantCardProps) {

  return (
    <li key={restaurant.id} className="flex flex-col gap-3 w-4/5 mx-auto my-8">
      <Link href={`/restaurants/${restaurant.id}`}>
        <h2 className='font-bold text-lg text-blue-500'>{restaurant.name}</h2>
        <p>{restaurant.description}</p>
        <p>Email: {restaurant.email}</p>
      </Link>
    </li>
  );
}
