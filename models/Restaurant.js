import { faker } from '@faker-js/faker';
import { db } from '../lib/firebase.config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
