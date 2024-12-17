export const fetchRestaurants = async (bounds: mapboxgl.LngLatBounds) => {
  const { _ne, _sw } = bounds;
  console.log('Fetching restaurants with bounds:', _ne, _sw); // Log bounds for debugging

  try {
    const response = await fetch(
      `/api/restaurants?neLat=${_ne.lat}&neLng=${_ne.lng}&swLat=${_sw.lat}&swLng=${_sw.lng}`
    );

    const data = await response.json();

    if (!response.ok) throw new Error('Failed to fetch restaurants');
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};
