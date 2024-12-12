import axios from 'axios';

export default async function geocodeAddress(address) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;

  try {
    const response = await axios.get(url, {
      params: { address, key: apiKey },
    });

    // console.log('Geocoding response:', response.data.results[0].geometry.location.lat);

    if (response.data.status === 'OK') {
      return response.data.results[0].geometry.location;
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error during geocoding:', error.message);
    throw error;
  }
}


export { geocodeAddress };
