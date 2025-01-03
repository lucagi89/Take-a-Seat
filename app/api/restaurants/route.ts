import { NextRequest, NextResponse } from 'next/server';
// import { db } from '../../../lib/firebase.config'
// import { db, auth } from '../../../lib/firebase.config';
import { query, where, getDocs, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { restaurantsRef, auth } from '../../../lib/firebase.config'
import { getAuth } from 'firebase-admin/auth';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // Validate and parse query parameters
    const neLatParam = url.searchParams.get('neLat');
    const neLngParam = url.searchParams.get('neLng');
    const swLatParam = url.searchParams.get('swLat');
    const swLngParam = url.searchParams.get('swLng');

    if (!neLatParam || !neLngParam || !swLatParam || !swLngParam) {
      return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
    }

    const neLat = parseFloat(neLatParam);
    const neLng = parseFloat(neLngParam);
    const swLat = parseFloat(swLatParam);
    const swLng = parseFloat(swLngParam);

    // Validate ranges
    if (
      isNaN(neLat) || isNaN(neLng) || isNaN(swLat) || isNaN(swLng) ||
      neLat < -90 || neLat > 90 || neLng < -180 || neLng > 180 ||
      swLat < -90 || swLat > 90 || swLng < -180 || swLng > 180
    ) {
      return NextResponse.json({ error: 'Invalid latitude or longitude values' }, { status: 400 });
    }

    // Query Firestore
    const geoQuery = query(
      restaurantsRef,
      where('latitude', '>=', swLat),
      where('latitude', '<=', neLat),
      where('longitude', '>=', swLng),
      where('longitude', '<=', neLng)
    );
    const snapshot = await getDocs(geoQuery);

    // Map results
    const restaurants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}




export async function POST(req : NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Authenticate the user
    const idToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Validate the request body
    if (!body.name || !body.latitude || !body.longitude) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const restaurantData = {
      ...body,
      ownerId: userId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(restaurantsRef, restaurantData);

    // Return the ID of the newly created document
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}



export async function PUT(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Authenticate the user
    const idToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Validate the request body
    if (!body.id || !body.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const restaurantData = {
      ...body,
      ownerId: userId, // Ensure the owner ID is consistent
    };

    // Update the document in the "restaurants" collection
    await setDoc(doc(restaurantsRef, body.id), restaurantData, { merge: true });

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return NextResponse.json({ error: 'Failed to update restaurant' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Authenticate the user
    const idToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Validate the request body
    if (!body.id) {
      return NextResponse.json({ error: 'Missing required fields: id' }, { status: 400 });
    }

    // Reference to the restaurant document
    const restaurant = doc(restaurantsRef, body.id);

    // Delete the document
    await deleteDoc(restaurant);

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json({ error: 'Failed to delete restaurant' }, { status: 500 });
  }
}
