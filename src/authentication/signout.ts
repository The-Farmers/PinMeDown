import { auth } from "./firebaseConfig";

export async function signout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(`Error in signout.ts ${error}`);
  }
}
