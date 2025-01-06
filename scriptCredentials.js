import admin from 'firebase-admin';
import serviceAccount from '/Users/lucagattamelata/take-a-seat/take-a-seat-56e45-434cd4e4d682.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

(async () => {
  try {
    const test = await db.collection('test').get();
    console.log('Firestore connection successful:', test.empty ? 'No data' : 'Data exists');
  } catch (error) {
    console.error('Error connecting to Firestore:', error);
  }
})();
