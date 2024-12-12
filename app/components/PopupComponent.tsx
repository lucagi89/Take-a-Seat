import Link from 'next/link';
// import type { RestaurantProp } from './MapComponent'
type PopupComponentProps = {
  restaurantId: string;
  restaurantName: string;
};

export default function PopupComponent(props: PopupComponentProps) {
  return (
    <Link href={`/restaurants/${props.restaurantId}`} className="popup">
      <h1>{props.restaurantName}</h1>
    </Link>
  );
}
