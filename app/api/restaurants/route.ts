import { db } from '../firebase';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';


export async function GET(request: Request) {
  return new Response('GET request received');
}
