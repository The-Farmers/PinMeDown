import firebase from "firebase";
import { auth } from "./firebaseConfig";

const googleSignup = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);

    const { user } = await auth.getRedirectResult();
    // const token = (credential as any)?.accessToken;
    return user;
  } catch (error) {
    console.error(`Error in authentication: ${error}`);
  }
};

module.exports = {
  googleSignup,
};
