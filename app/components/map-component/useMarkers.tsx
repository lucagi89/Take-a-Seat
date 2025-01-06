import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchRestaurants } from './fetchRestaurants'
// import { createMarker } from './marker-utils';
import PopupComponent from '../PopupComponent';
import { createRoot } from 'react-dom/client';



export default function useMarkers(map: mapboxgl.Map | null) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (!map) return;

    const updateRestaurants = async () => {
      const bounds = map.getBounds();
      if (bounds) {
        const data = await fetchRestaurants(bounds);
        setRestaurants(data);
      }
    };


    map.on('load', updateRestaurants);
    map.on('moveend', updateRestaurants);
    map.on('zoomend', updateRestaurants);

    return () => {
      if (map) {
        map.off('moveend', updateRestaurants);
      }
    };
  }, [map]);


  useEffect(() => {
    if (!map) return;

    document.querySelectorAll('.restaurant-marker').forEach((marker) => marker.remove());

    if (restaurants){
      restaurants.forEach((restaurant) => {
      const { longitude, latitude, name, is_available } = restaurant;

      const popupElement = document.createElement('div');
      const root = createRoot(popupElement);
      root.render(<PopupComponent restaurantName={name} />);
      const markerColor = is_available ? 'green' : 'red';

      new mapboxgl.Marker({color: markerColor})
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setDOMContent(popupElement))
        .addTo(map);
    });
    }


  }, [restaurants, map]);
}
