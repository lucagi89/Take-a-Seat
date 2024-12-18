import mapboxgl from 'mapbox-gl';

// import styles from './map-styles.module.css';

export const createMarker = (imageUrl: string) => {
  const el = document.createElement('div');
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.width = '30px';
  img.style.height = '30px';
  el.appendChild(img);
  return el;
};

// console.log('Styles object:', styles.pulsingMarker);

// export const createPulsingMarker = () => {
//   const el = document.createElement('div');
//   el.className = styles.pulsingMarker; // Apply the CSS class
//   return el;
// };
// import { setMapState } from './mapContext';
export const handleUserLocation = (
  map: mapboxgl.Map,
  setMapState: (state: { center: [number, number]; zoom: number }) => void
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        // Add a blue marker at the user's location
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([longitude, latitude])
          .addTo(map);

        // Fly to the user's location
        map.flyTo({ center: [longitude, latitude], zoom: 14 });

        // Update the global map state
        setMapState({ center: [longitude, latitude], zoom: 14 });
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};
