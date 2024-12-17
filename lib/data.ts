'use server';

import { db } from './firebase.config';
import { collection, getDocs, getDoc, DocumentData, doc } from 'firebase/firestore';

export default async function fetchRestaurants(): Promise<DocumentData[]> {

  const collectionRef = collection(db, 'restaurants');
  const snapshot = await getDocs(collectionRef);
  const restaurants = snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    city: doc.data().city,
    address: doc.data().address,
    postcode: doc.data().postcode,
    latitude: doc.data().latitude,
    longitude: doc.data().longitude,
    phone: doc.data().phone,
    email: doc.data().email,
    isAvailable: doc.data().isAvailable,
  }));
  return restaurants;
}

// fetchRestaurants();



export async function getRestaurantData(id: string): Promise<DocumentData> {
  const docRef = doc(db, "restaurants", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }

  return docSnap.data();
}
