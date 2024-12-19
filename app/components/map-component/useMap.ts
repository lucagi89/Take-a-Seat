// import { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { handleUserLocation } from './marker-utils'
// const useMap = (
//   mapContainerRef: React.RefObject<HTMLDivElement>,
//   setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>
// ) => {
//   useEffect(() => {
//     if (!mapContainerRef.current) return;


//     mapboxgl.accessToken = 'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';

//     const mapInstance = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-0.09, 51.505],
//       zoom: 14,
//     });

//     setMap(mapInstance); // Set the map in state
//     handleUserLocation(mapInstance);

//     mapInstance.on('load', () => {
//     });

//     return () => {
//       mapInstance.remove();
//     };
//   }, [mapContainerRef, setMap]);
// };

// export default useMap;


import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapContext } from './mapContext';
import { handleUserLocation } from './marker-utils';

export default function useMap(
  mapContainerRef: React.RefObject<HTMLDivElement>,
  setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>
) {
  const { setMapState } = useMapContext();
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.09, 51.505], // Default location
      zoom: 14,
    });

    if (mapInstance){
      handleUserLocation(mapInstance, setMapState);
      setMap(mapInstance);
    }

    return () => mapInstance.remove();
  }, [mapContainerRef, setMap, setMapState])
}
