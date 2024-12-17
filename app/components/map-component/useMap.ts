import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { handleUserLocation } from './marker-utils'
const useMap = (
  mapContainerRef: React.RefObject<HTMLDivElement>,
  setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>
) => {
  useEffect(() => {
    if (!mapContainerRef.current) return;


    mapboxgl.accessToken = 'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.09, 51.505],
      zoom: 14,
    });

    setMap(mapInstance); // Set the map in state
    handleUserLocation(mapInstance);

    mapInstance.on('load', () => {
    });

    return () => {
      mapInstance.remove();
    };
  }, [mapContainerRef, setMap]);
};

export default useMap;
