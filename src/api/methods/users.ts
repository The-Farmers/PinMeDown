import firebaseApp from "../../authentication/firebaseConfig";
import { User } from "../models";

export async function createUser(user: User) {
  // Check if user already exists
  if (await userAlreadyExists(user)) {
    throw Error("User already exists");
  }

  firebaseApp
    .database()
    .ref(`users/${user.name}`)
    .set({ name: user.name, groups: [] });
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
