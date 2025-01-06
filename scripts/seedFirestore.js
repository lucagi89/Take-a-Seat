import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

import serviceAccount from '../take-a-seat-56e45-434cd4e4d682.json' assert { type: 'json' };


delete process.env.FIRESTORE_EMULATOR_HOST;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    process.exit(1);
  }
}

const db = admin.firestore();
export { db };

import { fakeRestaurants } from './fakeRestaurants.js';

async function deleteAllData(collectionName) {
  try {
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();
    const batch = db.batch();
    let count = 0;

    if (snapshot.empty) {
      console.log(`No documents found in collection '${collectionName}'.`);
      return { success: true };
    }

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
    });

    await batch.commit();
    console.log(`Successfully deleted ${count} documents from collection '${collectionName}'.`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting documents from '${collectionName}':`, error);
    return { success: false, error: error.message };
  }
}

async function seedRestaurants() {
  const restaurantsCollection = db.collection('restaurants');

  try {
    await deleteAllData('restaurants');

    const batch = db.batch();
    fakeRestaurants.forEach((restaurant) => {
      const docRef = restaurantsCollection.doc();
      batch.set(docRef, restaurant);
    });

    await batch.commit();
    console.log('Restaurants added successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

seedRestaurants()
  .then(() => {
    console.log('Restaurants Seeding Completed');
  })
  .catch((error) => {
    console.error('Restaurants Seeding Failed:', error);
  })
  .finally(() => {
    process.exit(0);
  });
