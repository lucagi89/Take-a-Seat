'use client';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import fetchRestaurants from '../../lib/data';
import { Restaurant } from './../../types/data-types';
import Image from 'next/image';
import PopupComponent from './PopupComponent';
import { createRoot } from 'react-dom/client';



import mapboxgl from 'mapbox-gl';



export type RestaurantProp = {
  id: string;
  name: string;
  city: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  isAvailable: boolean;
}



export default function MapComponent() {
  const [restaurants, setRestaurants] = useState<RestaurantProp[]>([]);

 const markerImageUrl = '/images/marker.svg';

 function customMarker(imageUrl: string) {
  const markerElement = document.createElement('div');
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = 'marker';
  img.style.width = '100px';
  img.style.height = '100px';

  markerElement.appendChild(img);
  return markerElement;
}


  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';


    fetchRestaurants().then((restaurants) => {
      setRestaurants(restaurants);

      const map = new mapboxgl.Map({
        container: 'map', // The ID of the HTML element to contain the map
        style: 'mapbox://styles/mapbox/streets-v11', // Map style
        center: [-0.09, 51.505],
        zoom: 13, // Initial zoom level
      });
      for(const restaurant of restaurants) {
        const { longitude, latitude, name, id } = restaurant;

        const popupElement = document.createElement('div');
        const root = createRoot(popupElement);
        root.render(
          <PopupComponent restaurantId={id} restaurantName={name}/>
        );

        if (longitude != null && latitude != null) {
          const popup = new mapboxgl.Popup()
          .setDOMContent(popupElement)
          .setLngLat([longitude, latitude]);

          new mapboxgl.Marker({
            element: customMarker(markerImageUrl)
          })
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map);
        } else {
          console.warn("Invalid coordinates for restaurant:", name);
        }
      };
    });

  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '500px', position: 'relative'}} />
  );
}
