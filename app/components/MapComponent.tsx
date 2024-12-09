'use client';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// Define container style
const containerStyle = {
  width: '100%',
  height: '500px',
};

// Set initial center position
const center = {
  lat: 51.5074, // London latitude
  lng: -0.1278, // London longitude
};

const ActualMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Map children like markers go here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default ActualMapComponent;
