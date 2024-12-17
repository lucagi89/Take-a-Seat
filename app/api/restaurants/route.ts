import { NextRequest, NextResponse } from 'next/server';
// import { db } from '../../../lib/firebase.config'
import { query, where, getDocs } from 'firebase/firestore';
import { restaurantsRef } from '../../../lib/firebase.config'

export async function GET(req: NextRequest) {
  // Parse query parameters
  const url = new URL(req.url);
  const neLat = parseFloat(url.searchParams.get('neLat') || '');
  const neLng = parseFloat(url.searchParams.get('neLng') || '');
  const swLat = parseFloat(url.searchParams.get('swLat') || '');
  const swLng = parseFloat(url.searchParams.get('swLng') || '');

  // Validate query parameters
  if (isNaN(neLat) || isNaN(neLng) || isNaN(swLat) || isNaN(swLng)) {
    return NextResponse.json({ error: 'Missing or invalid query parameters' }, { status: 400 });
  }

  try {
    // Reference the "restaurants" collection
    // const restaurantsRef = collection(db, 'restaurants');

    // Query restaurants within bounds
    const latitudeQuery = query(
      restaurantsRef,
      where('latitude', '>=', swLat),
      where('latitude', '<=', neLat)
    );

    // Execute the restaurantsRef
    const snapshot = await getDocs(latitudeQuery);

    // Map the query results
    const restaurants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    // Return the results
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500
    });
  }
}
//
