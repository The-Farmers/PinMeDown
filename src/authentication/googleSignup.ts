import firebase from "firebase/app";
import { auth } from "./firebaseConfig";

export const googleSignup = async () => {
  try {
    console.log("Hi");
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    // const token = (credential as any)?.accessToken;
    return user;
  } catch (error) {
    console.error(`Error in authentication: ${error}`);
    return null;
  }
};
