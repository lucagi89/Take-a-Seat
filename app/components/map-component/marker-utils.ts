import mapboxgl from 'mapbox-gl';

export const createMarker = (imageUrl: string) => {
  const el = document.createElement('div');
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.width = '30px';
  img.style.height = '30px';
  el.appendChild(img);
  return el;
};

export const handleUserLocation = (map: mapboxgl.Map) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([longitude, latitude])
        .addTo(map);

      map.flyTo({ center: [longitude, latitude], zoom: 14 });
    });
  }
};
