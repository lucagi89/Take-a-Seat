

'use client';
import { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import useMap from './useMap';
import useMarkers from './useMarkers';

export default function MapComponent() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // Initialize the map and save state
  useMap(mapContainerRef, setMap);

  // Load restaurant markers
  useMarkers(map);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
}
