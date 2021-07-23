import firebaseApp from "../../authentication/firebaseConfig";
import { User } from "../models";

export async function createUser(user: User) {
  try {
    console.log("TRY CREATING USER:", user.name);
    const dbRef = firebaseApp.database().ref(`users/${user.name}`);
    console.log(dbRef);
    dbRef.set({ name: user.name });
  } catch (e) {
    console.log("FK U", e);
  }
}

export async function userAlreadyExists(user: User) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef.child(`users/${user.name}`).get();

    if (snapshot.exists()) {
      console.log("ALREADY EXIST", snapshot.val());
      return true;
    }
    console.log("NO EXIST", snapshot.val());
    return false;
  } catch {
    console.log("Error getting snapshot");
  }
}
