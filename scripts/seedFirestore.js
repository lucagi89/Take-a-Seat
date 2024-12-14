'use router';
import dotenv from 'dotenv';
dotenv.config();

import { faker } from '@faker-js/faker';
import { db } from '../lib/firebase.config.js';
import { collection, addDoc } from 'firebase/firestore';
import geocodeAddress from '../lib/map.js';

import admin from 'firebase-admin';

console.log('Google Maps API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://take-a-seat-56e45.firebaseio.com',
    projectId: 'take-a-seat-56e45', // Add your project ID explicitly
  });
}

async function deleteAllData(collectionName) {
  const db = admin.firestore(); // Ensure the Admin SDK is initialized
  try {
    const snapshot = await db.collection(collectionName).get();
    if (snapshot.empty) {
      console.log(`No documents found in collection '${collectionName}'.`);
      return { success: true };
    }

    const batch = db.batch();
    let count = 0;

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
    });

    await batch.commit(); // Commit the batch
    console.log(`Successfully deleted ${count} documents from collection '${collectionName}'.`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting documents from '${collectionName}':`, error);
    return { success: false, error: error.message };
  }
}








async function seedRestaurants() {
  const restaurantsCollection = collection(db, 'restaurants');
  console.log('Seeding started...');

  try {
    console.log('Calling geocodeAddress...');
    await deleteAllData('restaurants');
    const geolocation1 = await geocodeAddress('279 willesden lane, London, NW2 5JA');
    const geolocation2 = await geocodeAddress('10 Whitehall Place, London, SW1A 2BD');
    const geolocation3 = await geocodeAddress('150 Piccadilly, St. James\'s, London, W1J 9BR');
    // console.log('Geolocation obtained:', geolocation);
    console.log('Firebase Admin initialized:', admin.apps.length > 0);

    const restaurants= [
      {
      id: 1,
      id_owner: '1',
      name: "Luca's Restaurant",
      city: "London",
      address: "279 willesden lane",
      postcode: "NW2 5JA",
      latitude: geolocation1.lat,
      longitude: geolocation1.lng,
      phone: '020 8452 9898',
      email: faker.internet.email(),
      website: faker.internet.url(),
      google_link: faker.internet.url(),
      trip_advisor_link: faker.internet.url(),
      description: faker.lorem.paragraph(),
      cuisine_one: faker.lorem.word(),
      cuisine_two: faker.lorem.word(),
      cuisine_three: faker.lorem.word(),
      style: faker.lorem.word(),
      total_num_of_seats: 100,
      num_of_taken_seats: 50,
      first_opening_hour: '11:00',
      first_closing_hour: '15:00',
      second_opening_hour: '18:00',
      second_closing_hour: '22:00',
      menu: faker.internet.url(),
      is_available: faker.datatype.boolean(),
      pictures: [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id:2,
      id_owner: '1',
      name: "Corinthia Hotel",
      city: "London",
      address: "Whitehall Pl",
      postcode: "SW1A 2BD",
      latitude: geolocation2.lat,
      longitude: geolocation2.lng,
      phone: '020 8452 9898',
      email: faker.internet.email(),
      website: faker.internet.url(),
      google_link: faker.internet.url(),
      trip_advisor_link: faker.internet.url(),
      description: faker.lorem.paragraph(),
      cuisine_one: faker.lorem.word(),
      cuisine_two: faker.lorem.word(),
      cuisine_three: faker.lorem.word(),
      style: faker.lorem.word(),
      total_num_of_seats: 100,
      num_of_taken_seats: 50,
      first_opening_hour: '11:00',
      first_closing_hour: '15:00',
      second_opening_hour: '18:00',
      second_closing_hour: '22:00',
      menu: faker.internet.url(),
      is_available: faker.datatype.boolean(),
      pictures: [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id:3,
      id_owner: '1',
      name: "The Ritz",
      city: "London",
      address: "150 Piccadilly, St. James's",
      postcode: "W1J 9BR",
      latitude: geolocation3.lat,
      longitude: geolocation3.lng,
      phone: '020 8452 9898',
      email: faker.internet.email(),
      website: faker.internet.url(),
      google_link: faker.internet.url(),
      trip_advisor_link: faker.internet.url(),
      description: faker.lorem.paragraph(),
      cuisine_one: faker.lorem.word(),
      cuisine_two: faker.lorem.word(),
      cuisine_three: faker.lorem.word(),
      style: faker.lorem.word(),
      total_num_of_seats: 100,
      num_of_taken_seats: 50,
      first_opening_hour: '11:00',
      first_closing_hour: '15:00',
      second_opening_hour: '18:00',
      second_closing_hour: '22:00',
      menu: faker.internet.url(),
      is_available: faker.datatype.boolean(),
      pictures: [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

    console.log('delete All Restaurants...');
    await deleteAllData('restaurants');
    console.log('All restaurants deleted, adding new restaurant...');

    for (const restaurant of restaurants) {

      await addDoc(restaurantsCollection, restaurant); // Add restaurant to Firestore

    }

    console.log('Restaurant added successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}




// async function seedUsers() {

//   const usersCollection = collection(db, 'users');
//   const users = [];

//   for (let i = 0; i < 10; i++) {
//     const user = {
//       id: 1,
//       first_name: faker.person.firstName(),
//       last_name: faker.person.lastName(),
//       email: faker.internet.email(),
//       phone: faker.phone.number({ style: 'international' }),
//       password: faker.internet.password(),
//       is_host: faker.datatype.boolean(),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     users.push(user);
//   }
//   try {
//     console.log('Delete All Users...');
//     await deleteAllData('users');
//     console.log('All users deleted, adding new users...');

//     for (const user of users) {
//       await addDoc(usersCollection, user); // Add user to Firestore
//       console.log(`Added user: ${user.first_name} ${user.last_name}`);
//     }

//   } catch (error) {
//     console.error('Error adding document:', error);
//   }
// }

// seedUsers().then(() => {
//   console.log('Users Seeding Completed');
//   process.exit(0); // Exit the script after completion
// }).catch((error) => {
//   console.error('Users Seeding Failed:', error);
//   process.exit(1);
// });



seedRestaurants().then(() => {
  console.log('Restaurants Seeding Completed');
  process.exit(0); // Exit the script after completion
}).catch((error) => {
  console.error('Restaurants Seeding Failed:', error);
  process.exit(1);
});
