// 'use client';
// import { useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import useMap from './useMap';
// import useMarkers from './useMarkers';
// import { useMapContext } from './mapContext';

// export default function MapComponent() {
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const { mapState, setMapState } = useMapContext();

//   // Initialize the map
//   useMap(mapContainerRef, setMap);

//   // Load restaurant markers
//   useMarkers(map);

//   return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
// }

'use client';
import { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import useMap from './useMap';
import useMarkers from './useMarkers';

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // Initialize the map and save state
  useMap(mapContainerRef, setMap);

  // Load restaurant markers
  useMarkers(map);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
}
