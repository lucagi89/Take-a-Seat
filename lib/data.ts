'use server';

import { db } from './firebase.config';
import { DocumentData } from 'firebase/firestore';
import {Restaurant} from '../types/data-types'

export default async function fetchRestaurants(): Promise<Restaurant[]> {

  const collectionRef = collection(db, 'restaurants');
  const snapshot = await getDocs(collectionRef);
  const restaurants = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as DocumentData
  }));
  return restaurants as Restaurant[];
}

// fetchRestaurants();



import { collection, query, where, getDocs } from 'firebase/firestore';
// import { firebaseApp } from './firebase';

// const db = getFirestore(firebaseApp);

export async function getRestaurantData(name: string) {
  try {
    const decodedName = decodeURIComponent(name); // Decode the URL parameter
    console.log(`Server Fetching restaurant: ${decodedName}`);

    // Query Firestore for a restaurant with the decoded name
    const q = query(collection(db, 'restaurants'), where('name', '==', decodedName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`No restaurant found with the name: ${decodedName}`);
      throw new Error(`Restaurant called ${decodedName} not found`);
    }

    // Return the first matching document
    const restaurantData = querySnapshot.docs[0].data();
    return restaurantData;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching restaurant:', error.message);
    } else {
      console.error('Error fetching restaurant:', error);
    }
    throw error;
  }
}
