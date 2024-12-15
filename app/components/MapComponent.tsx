
'use client';
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import PopupComponent from './PopupComponent';

export type RestaurantProp = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export default function MapComponent() {
  const [restaurants, setRestaurants] = useState<RestaurantProp[]>([]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerImageUrl = '/images/marker.svg';

  // Function to fetch restaurants within the current map bounds
  const fetchRestaurantsInView = async (bounds: mapboxgl.LngLatBounds) => {
    const { _ne, _sw } = bounds;

    try {
      const response = await fetch(
        `/api/restaurants?neLat=${_ne.lat}&neLng=${_ne.lng}&swLat=${_sw.lat}&swLng=${_sw.lng}`
      );
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      const filteredRestaurants: RestaurantProp[] = await response.json();

      setRestaurants(filteredRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Create a custom marker with an image
  function customMarker(imageUrl: string) {
    const markerElement = document.createElement('div');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'marker';
    img.style.width = '40px';
    img.style.height = '40px';
    markerElement.appendChild(img);
    return markerElement;
  }

  useEffect(() => {
    // Initialize Mapbox
    mapboxgl.accessToken =
      'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.09, 51.505], // Default center
      zoom: 13,
    });

    setMap(mapInstance);

    // Use Geolocation API to center the map on the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', { latitude, longitude });

          // Center map on user's location
          mapInstance.setCenter([longitude, latitude]);

          // Add a marker for the user's location
          new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setText('You are here!'))
            .addTo(mapInstance);
        },
        (error) => {
          console.error('Error getting user location:', error);
          alert('Could not get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }

    // Fetch restaurants on map load
    mapInstance.on('load', () => {
      const bounds = mapInstance.getBounds();
      if (bounds) {
        fetchRestaurantsInView(bounds);
      }
    });

    // Fetch restaurants when the map is moved or zoomed
    mapInstance.on('moveend', () => {
      const bounds = mapInstance.getBounds();
      if (bounds) {
        fetchRestaurantsInView(bounds);
      }
    });

    return () => mapInstance.remove(); // Cleanup on unmount
  }, []);

  // Add markers when restaurants are updated
  useEffect(() => {
    if (!map) return;

    // Remove existing markers
    document.querySelectorAll('.restaurant-marker').forEach((marker) => marker.remove());

    // Add new markers for filtered restaurants
    restaurants.forEach((restaurant) => {
      const { longitude, latitude, name, id } = restaurant;

      if (longitude != null && latitude != null) {
        const popupElement = document.createElement('div');
        const root = createRoot(popupElement);
        root.render(<PopupComponent restaurantId={id} restaurantName={name} />);

        new mapboxgl.Marker({
          element: customMarker(markerImageUrl),
          className: 'restaurant-marker',
        })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setDOMContent(popupElement))
          .addTo(map);
      }
    });
  }, [restaurants, map]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
}
