import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const neLat = parseFloat(searchParams.get('neLat') || '0');
  const neLng = parseFloat(searchParams.get('neLng') || '0');
  const swLat = parseFloat(searchParams.get('swLat') || '0');
  const swLng = parseFloat(searchParams.get('swLng') || '0');

  console.log('Received bounds:', { neLat, neLng, swLat, swLng });

  if (!neLat || !neLng || !swLat || !swLng) {
    return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
  }

  try {
    const snapshot = await db.collection('restaurants')
      .where('latitude', '>=', swLat)
      .where('latitude', '<=', neLat)
      .get();

    const filteredRestaurants = snapshot.docs
      .map((doc) => doc.data())
      .filter(
        (restaurant) =>
          restaurant.longitude >= swLng && restaurant.longitude <= neLng
      );

    return NextResponse.json(filteredRestaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}
