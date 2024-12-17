import mapboxgl from 'mapbox-gl';


// export const initializeMap = (center: [number, number]) => {
//   const mapInstance = new mapboxgl.Map({
//     container: mapContainerRef.current as HTMLDivElement,
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center,
//     zoom: 14,
//   });
// };



export function createMarker(imageUrl: string): HTMLDivElement{
  const markerElement = document.createElement('div');
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = 'marker';
  img.style.width = '40px';
  img.style.height = '40px';
  img.style.transition = 'transform 0.2s ease'; // Smooth scaling
  img.style.transformOrigin = 'center';
  markerElement.appendChild(img);
  return markerElement;
};

export async function handleUserLocation(mapInstance: mapboxgl.Map){
  const userMarkerImageUrl = '/images/temp-marker.svg';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLocation: [number, number] = [
        position.coords.longitude,
        position.coords.latitude,
      ];

      mapInstance.setCenter(userLocation);
      mapInstance.flyTo({ center: userLocation, zoom: 14 });

      new mapboxgl.Marker({
        element: createMarker(userMarkerImageUrl),
        className: 'user-location-marker',
      })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setText('You are here!'))
        .addTo(mapInstance);
    },
    (error) => {
      console.error('Geolocation error:', error.message);
      const fallbackLocation: [number, number] = [-0.09, 51.505];
      mapInstance.setCenter(fallbackLocation);
    },
    {
      enableHighAccuracy: true

    }
  );
}
