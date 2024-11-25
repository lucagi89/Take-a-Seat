import { db } from './firebase.config';
import { collection, getDocs, getDoc, DocumentData, DocumentSnapshot, doc } from 'firebase/firestore';

export default async function fetchRestaurants(): Promise<DocumentData[]> {

  const collectionRef = collection(db, 'restaurants');
  const snapshot = await getDocs(collectionRef);
  const restaurants = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return restaurants;
}

export async function getRestaurantData(id: string): Promise<DocumentData> {
  const collectionRef = collection(db, 'restaurants');
  const document: DocumentSnapshot<DocumentData> = await getDoc(doc(collectionRef, id));
  if (!document.exists()) {
    throw new Error('No such document!');
  }
  return document.data();
}
