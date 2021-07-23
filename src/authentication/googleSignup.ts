import firebase from "firebase/app";
import { auth } from "./firebaseConfig";

export const googleSignup = async () => {
  try {
    console.log("Hi");
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
    const { user } = await auth.getRedirectResult();
    // const token = (credential as any)?.accessToken;
    return user;
  } catch (error) {
    console.error(`Error in authentication: ${error}`);
    return null;
  }
};
