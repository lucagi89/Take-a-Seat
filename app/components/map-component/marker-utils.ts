import mapboxgl from 'mapbox-gl';

import styles from './map-styles.module.css';

export const createMarker = (imageUrl: string) => {
  const el = document.createElement('div');
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.width = '30px';
  img.style.height = '30px';
  el.appendChild(img);
  return el;
};

console.log('Styles object:', styles);

export const createPulsingMarker = () => {
  const el = document.createElement('div');
  el.className = styles.pulsingMarker; // Apply the CSS class
  return el;
};



export const handleUserLocation = (map: mapboxgl.Map) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      new mapboxgl.Marker(
        { element: createPulsingMarker(),
          anchor: 'center'
         }
        )
        .setLngLat([longitude, latitude])
        .addTo(map);

      map.flyTo({ center: [longitude, latitude], zoom: 14 });
    });
  }
};
