import dotenv from 'dotenv';
dotenv.config();

import { faker } from '@faker-js/faker';
import { db } from '../lib/firebase.config.js';
import { collection, addDoc } from 'firebase/firestore';


async function seedRestaurants() {

  const restaurantsCollection = collection(db, 'restaurants');

  for (let i = 0; i < 10; i++) {
    const restaurant = {
      id_owner: faker.number.int(),
      name: faker.company.name(),
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number({ style: 'international' }),
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
    };

    try {
      await addDoc(restaurantsCollection, restaurant);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
}


async function seedUsers() {

  const usersCollection = collection(db, 'users');

  for (let i = 0; i < 10; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      password: faker.internet.password(),
      is_host: faker.datatype.boolean(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await addDoc(usersCollection, user);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
}

seedUsers().then(() => {
  console.log('Seeding completed');
  process.exit(0); // Exit the script after completion
}).catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});



seedRestaurants().then(() => {
  console.log('Seeding completed');
  process.exit(0); // Exit the script after completion
}).catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
