import mapboxgl from 'mapbox-gl';



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
