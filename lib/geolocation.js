
import axios from 'axios';


export default async function geocodeAddress(address){
  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;

  if (!apiKey) {
    throw new Error('Mapbox API key is missing. Please set NEXT_PUBLIC_MAPBOX_API_KEY in your environment variables.');
  }

  try {
    const response = await axios.get(url, {
      params: {
        access_token: apiKey, // Mapbox API key
        limit: 1, // Limit results to 1 location
      },
    });

    // Ensure the response has the expected structure
    if (response.status === 200 && response.data.features.length > 0) {
      const { center } = response.data.features[0];
      return center;
    } else {
      throw new Error('Geocoding failed: No results found.');
    }
  } catch (error) {
    console.error('Error during geocoding:', error.message);
    throw new Error(`Error during geocoding: ${error.message}`);
  }
}
