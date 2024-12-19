import mapboxgl from "mapbox-gl";

export const handleUserLocation = (
  map: mapboxgl.Map,
  setMapState: (state: { center: [number, number]; zoom: number }) => void
) => {
  // Ensure Mapbox Access Token is set
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;
  if (!mapboxgl.accessToken) {
    console.error("Mapbox API key is missing.");
    return;
  }

  // Check if Geolocation is supported
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    return;
  }

  // Request user location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { longitude, latitude } = position.coords;

      console.log(map)

      if (!map) {
        console.error("Map is not initialized.");
        return;
      }

      // Add a blue marker at the user's location
      // new mapboxgl.Marker({ color: "blue" })
      //   .setLngLat([longitude, latitude])
      //   .addTo(map);

      // Fly to the user's location
      map.flyTo({ center: [longitude, latitude], zoom: 14 });

      // Update the global map state
      setMapState({ center: [longitude, latitude], zoom: 14 });
    },
    (error) => {
      // Handle Geolocation errors
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        default:
          console.error("An unknown error occurred.");
          break;
      }
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
};
