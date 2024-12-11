'use client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import fetchRestaurants from '../../lib/data';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const getMarkerIcon = (is_available) => {
  return is_available
    ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' // Green icon for availability
    : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Red icon for unavailability
};

const defaultCenter = {
  lat: 51.5074,
  lng: -0.1278,
};

const ActualMapComponent = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [restaurants, setRestaurants] = useState<any>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude }); // Update the center state
          console.log('Device location:', { latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
     fetchRestaurants().then((data) => {
      setRestaurants(data);
    });
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            position={restaurant.geolocation}
            icon={getMarkerIcon(restaurant.is_available)} // Assumes your data has a geolocation field { lat, lng }
            title={restaurant.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default ActualMapComponent;
