// import { auth } from '../../lib/firebase.config';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from 'firebase/auth';

// // ... (Other functions for Google Sign-In, etc.)

// export const signup = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     // ... (Handle successful signup)
//     console.log(userCredential)
//   } catch (error) {
//     // ... (Handle errors)
//     console.log(error)
//   }
// };

// export const signin = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     // ... (Handle successful signin
//     console.log(userCredential)
//   } catch (error) {
//     // ... (Handle errors)
//     console.log(error)
//   }
// };

// export const signout = async () => {
//   try {
//     await signOut(auth);
//     // ... (Handle successful signout)
//     console.log('signed out')
//   } catch (error) {
//     // ... (Handle errors)
//     console.log(error)
//   }
// };

// export const onAuthStateChangedListener = (callback) => {
//   onAuthStateChanged(auth, (user) => {
//     callback(user);
//   });
// };
