
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { createRoot } from 'react-dom/client';
// import PopupComponent from './PopupComponent';

// export type RestaurantProp = {
//   id: string;
//   name: string;
//   latitude: number;
//   longitude: number;
// };

// export default function MapComponent() {
//   const [restaurants, setRestaurants] = useState<RestaurantProp[]>([]);
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const markerImageUrl = '/images/marker.svg';

//   // Function to fetch restaurants within the current map bounds
//   const fetchRestaurantsInView = async (bounds: mapboxgl.LngLatBounds) => {
//     const { _ne, _sw } = bounds;

//     try {
//       const response = await fetch(
//         `/api/restaurants?neLat=${_ne.lat}&neLng=${_ne.lng}&swLat=${_sw.lat}&swLng=${_sw.lng}`
//       );
//       if (!response.ok) throw new Error('Failed to fetch restaurants');
//       const filteredRestaurants: RestaurantProp[] = await response.json();

//       setRestaurants(filteredRestaurants);
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//     }
//   };

//   // Create a custom marker with an image
//   function customMarker(imageUrl: string) {
//     const markerElement = document.createElement('div');
//     const img = document.createElement('img');
//     img.src = imageUrl;
//     img.alt = 'marker';
//     img.style.width = '40px';
//     img.style.height = '40px';
//     markerElement.appendChild(img);
//     return markerElement;
//   }

//   useEffect(() => {
//     // Initialize Mapbox
//     mapboxgl.accessToken =
//       'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';

//     const mapInstance = new mapboxgl.Map({
//       container: mapContainerRef.current as HTMLDivElement,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-0.09, 51.505], // Default center
//       zoom: 13,
//     });

//     setMap(mapInstance);

//     // Use Geolocation API to center the map on the user's location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log('User location:', { latitude, longitude });

//           // Center map on user's location
//           mapInstance.setCenter([longitude, latitude]);

//           // Add a marker for the user's location
//           new mapboxgl.Marker({ color: 'blue' })
//             .setLngLat([longitude, latitude])
//             .setPopup(new mapboxgl.Popup().setText('You are here!'))
//             .addTo(mapInstance);
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//           alert('Could not get your location. Please enable location services.');
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by your browser.');
//     }

//     // Fetch restaurants on map load
//     mapInstance.on('load', () => {
//       const bounds = mapInstance.getBounds();
//       if (bounds) {
//         fetchRestaurantsInView(bounds);
//       }
//     });

//     // Fetch restaurants when the map is moved or zoomed
//     mapInstance.on('moveend', () => {
//       const bounds = mapInstance.getBounds();
//       if (bounds) {
//         fetchRestaurantsInView(bounds);
//       }
//     });

//     return () => mapInstance.remove(); // Cleanup on unmount
//   }, []);

//   // Add markers when restaurants are updated
//   useEffect(() => {
//     if (!map) return;

//     // Remove existing markers
//     document.querySelectorAll('.restaurant-marker').forEach((marker) => marker.remove());

//     // Add new markers for filtered restaurants
//     restaurants.forEach((restaurant) => {
//       const { longitude, latitude, name, id } = restaurant;

//       if (longitude != null && latitude != null) {
//         const popupElement = document.createElement('div');
//         const root = createRoot(popupElement);
//         root.render(<PopupComponent restaurantId={id} restaurantName={name} />);

//         new mapboxgl.Marker({
//           element: customMarker(markerImageUrl),
//           className: 'restaurant-marker',
//         })
//           .setLngLat([longitude, latitude])
//           .setPopup(new mapboxgl.Popup().setDOMContent(popupElement))
//           .addTo(map);
//       }
//     });
//   }, [restaurants, map]);

//   return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
// }



// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import { createRoot } from 'react-dom/client';
// import PopupComponent from './PopupComponent';

// export type RestaurantProp = {
//   id: string;
//   name: string;
//   latitude: number;
//   longitude: number;
// };

// export default function MapComponent() {
//   const [restaurants, setRestaurants] = useState<RestaurantProp[]>([]);
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const markerImageUrl = '/images/marker.svg';
//   const userMarkerImageUrl = '/images/user-marker.svg';

//   // Function to fetch restaurants within the current map bounds
//   const fetchRestaurantsInView = async (bounds: mapboxgl.LngLatBounds) => {
//     const { _ne, _sw } = bounds;

//     try {
//       const response = await fetch(
//         `/api/restaurants?neLat=${_ne.lat}&neLng=${_ne.lng}&swLat=${_sw.lat}&swLng=${_sw.lng}`
//       );

//       if (!response.ok) throw new Error('Failed to fetch restaurants');

//       const data = await response.json();
//       console.log('Fetched restaurants data:', data);

//       // Ensure data is an array
//       if (Array.isArray(data)) {
//         setRestaurants(data);
//       } else {
//         console.error('Expected an array but got:', data);
//         setRestaurants([]); // Fallback to an empty array
//       }
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//       setRestaurants([]); // Fallback to an empty array
//     }
//   };


//   // Create a custom marker with an image
//   function createMarker(imageUrl: string) {
//     const markerElement = document.createElement('div');
//     const img = document.createElement('img');
//     img.src = imageUrl;
//     img.alt = 'marker';
//     img.style.width = '40px';
//     img.style.height = '40px';
//     markerElement.appendChild(img);
//     return markerElement;
//   }





//   useEffect(() => {
//     // Initialize Mapbox
//     mapboxgl.accessToken =
//       'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';

//     const mapInstance = new mapboxgl.Map({
//       container: mapContainerRef.current as HTMLDivElement,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-0.09, 51.505], // Default center
//       zoom: 13,
//     });

//     setMap(mapInstance);

//     // Fetch restaurants on map load
//     mapInstance.on('load', () => {
//       const bounds = mapInstance.getBounds();
//       if (bounds) {
//         fetchRestaurantsInView(bounds);
//       }
//     });

//     mapInstance.on('moveend', () => {
//       const bounds = mapInstance.getBounds();
//       if (bounds) {
//         fetchRestaurantsInView(bounds);
//       }
//     });

//     return () => mapInstance.remove(); // Cleanup on unmount
//   }, []);

//   // Add markers when restaurants are updated
//   useEffect(() => {
//     if (!map) return;

//     // Remove existing markers
//     document.querySelectorAll('.restaurant-marker').forEach((marker) => marker.remove());

//     // Add new markers for filtered restaurants
//     restaurants.forEach((restaurant) => {
//       const { longitude, latitude, name, id } = restaurant;

//       if (longitude != null && latitude != null) {
//         const popupElement = document.createElement('div');
//         const root = createRoot(popupElement);
//         root.render(<PopupComponent restaurantId={id} restaurantName={name} />);

//         new mapboxgl.Marker({
//           element: createMarker(markerImageUrl),
//           className: 'restaurant-marker',
//         })
//           .setLngLat([longitude, latitude])
//           .setPopup(new mapboxgl.Popup().setDOMContent(popupElement))
//           .addTo(map);
//       }
//     });
//   }, [restaurants, map]);



//   return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
// }



'use client';
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import PopupComponent from './PopupComponent';

export type RestaurantProp = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export default function MapComponent() {
  const [restaurants, setRestaurants] = useState<RestaurantProp[]>([]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerImageUrl = '/images/marker.svg';
  const userMarkerImageUrl = '/images/temp-marker.svg';

  // Fetch restaurants within the map bounds
  const fetchRestaurantsInView = async (bounds: mapboxgl.LngLatBounds) => {
    const { _ne, _sw } = bounds;

    try {
      const response = await fetch(
        `/api/restaurants?neLat=${_ne.lat}&neLng=${_ne.lng}&swLat=${_sw.lat}&swLng=${_sw.lng}`
      );

      if (!response.ok) throw new Error('Failed to fetch restaurants');

      const data = await response.json();
      console.log('Fetched restaurants data:', data);

      if (Array.isArray(data)) {
        setRestaurants(data);
      } else {
        console.error('Expected an array but got:', data);
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([]);
    }
  };

  const createMarker = (imageUrl: string): HTMLDivElement => {
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
  // Initialize the map
  const initializeMap = (center: [number, number]) => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 13,
    });

    setMap(mapInstance);

    // Add restaurants markers when map loads or moves
  // Fetch restaurants on map load
    mapInstance.on('load', () => {
      const bounds = mapInstance.getBounds();
      if (bounds) {
        fetchRestaurantsInView(bounds);
      }
    });

    mapInstance.on('moveend', () => {
      const bounds = mapInstance.getBounds();
      if (bounds) {
        fetchRestaurantsInView(bounds);
      }
    });

    return mapInstance;
  };

  // Handle user location
  const handleUserLocation = async (mapInstance: mapboxgl.Map) => {
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
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,

      }
    );
  };

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibHVrZS1naSIsImEiOiJjbTRraWV4cGEwZG9kMmlzY3hwOXFhdWZoIn0.RvUFk1iiTWdoWBujUM1Owg';

    const initialLocation: [number, number] = [-0.09, 51.505];
    const mapInstance = initializeMap(initialLocation);

    handleUserLocation(mapInstance);

    return () => mapInstance.remove();
  }, []);

  // Add markers for restaurants
  useEffect(() => {
    if (!map) return;

    document.querySelectorAll('.restaurant-marker').forEach((marker) => marker.remove());

    restaurants.forEach((restaurant) => {
      const { longitude, latitude, name, id } = restaurant;

      if (longitude != null && latitude != null) {
        const popupElement = document.createElement('div');
        const root = createRoot(popupElement);
        root.render(<PopupComponent restaurantId={id} restaurantName={name} />);

        new mapboxgl.Marker({
          element: createMarker(markerImageUrl),
          className: 'restaurant-marker',
        })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setDOMContent(popupElement))
          .addTo(map);
      }
    });
  }, [restaurants, map]);

  useEffect(() => {
    if (!map) return;

    const updateMarkerSizes = () => {
      const zoomLevel = map.getZoom();
      const scaleFactor = 1 + (zoomLevel - 11) * 0.1; // Adjust scaling based on zoom level

      document.querySelectorAll('.restaurant-marker img, .user-location-marker img').forEach((img) => {
        (img as HTMLImageElement).style.transform = `scale(${scaleFactor})`;
      });
    };

    map.on('zoom', updateMarkerSizes);

    return () => map.off('zoom', updateMarkerSizes);
  }, [map]);


  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
}





// async function fetchPreciseLocation() {
//   try {
//     const geolocation = new Promise<GeolocationPosition>((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
//     });

//     const position = await geolocation;
//     return {
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//       accuracy: position.coords.accuracy, // meters
//     };
//   } catch (error) {
//     console.error('Geolocation error, using external service fallback:', error);

//     // Fallback to Google Geolocation API
//     const response = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY', {
//       method: 'POST',
//     });
//     const data = await response.json();
//     return {
//       latitude: data.location.lat,
//       longitude: data.location.lng,
//       accuracy: data.accuracy,
//     };
//   }
// }
