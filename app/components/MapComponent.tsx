'use client';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import fetchRestaurants from '../../lib/data';
import { Restaurant } from './../../types/data-types';


import mapboxgl from 'mapbox-gl';


export default function MapComponent() {
  const [restaurants, setRestaurants] = useState<any>([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';


    fetchRestaurants().then((restaurants) => {
      setRestaurants(restaurants);

      const map = new mapboxgl.Map({
        container: 'map', // The ID of the HTML element to contain the map
        style: 'mapbox://styles/mapbox/streets-v11', // Map style
        // Initial map center device location
        center: [-0.09, 51.505],
        zoom: 13, // Initial zoom level
      });

      // Add a marker at the center of the map
      new mapboxgl.Marker()
        .setLngLat([-0.09, 51.505]) // Marker [lng, lat]
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Hello, world!</h3>')) // Add popup
        .addTo(map);

      for(const restaurant of restaurants) {
        new mapboxgl.Marker()
          .setLngLat([restaurant.geolocation.longitude, restaurant.geolocation.latitude]) // Marker [lng, lat]
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${restaurant.name}</h3>`)) // Add popup
          .addTo(map);
      };
    });

  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '500px' }} />
  );
}
