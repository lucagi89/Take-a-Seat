'use strict';
import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';
import serviceAccount from '../config/take-a-seat-56e45-firebase-adminsdk-53osj-f12752dc50.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

// import { db } from '../lib/firebase.config.js';
// import { collection, addDoc, getDocs, writeBatch } from 'firebase/firestore';
import { fakeRestaurants } from './fakeRestaurants.js';


deleteAllData('users');

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

    for (const restaurant of fakeRestaurants) {
      await restaurantsCollection.add(restaurant);
    }

    console.log('Restaurants added successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

seedRestaurants()
  .then(() => {
    console.log('Restaurants Seeding Completed');
    process.exit(0); // Exit the script after completion
  })
  .catch((error) => {
    console.error('Restaurants Seeding Failed:', error);
    process.exit(1);
  });
