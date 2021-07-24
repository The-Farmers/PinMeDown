import { useEffect, useState } from "react";
import firebaseApp from "../../authentication/firebaseConfig";
import { Group, User } from "../models";

export async function createUser(user: User) {
  try {
    firebaseApp
      .database()
      .ref()
      .child(`users/${user.userId}`)
      .set({ name: user.name });
  } catch (e) {
    console.log("Error creating user", e);
  }
}

export async function userAlreadyExists(user_id: string | undefined) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef.child(`users/${user_id}`).get();

    if (snapshot) {
      console.log("USER ALREADY EXISTS", snapshot.val());
      return true;
    }
    console.log("USER DOES NOT EXIST");
    return false;
  } catch (e) {
    console.log("Error getting snapshot", e);
  }
}

export async function getUserGroups(userId: string) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef.child(`users/${userId}/groups/`).get();
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  } catch (e) {
    console.log("ERRIR GET USER GROUP", e);
  }
  return [];
}

export async function getName(userId: string | undefined) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef.child(`users/${userId}`).get();

    if (snapshot.exists()) {
      console.log("USER ALREADY EXISTS", snapshot.val());
      return snapshot.val()?.name;
    }
  } catch (error) {
    console.error(error);
  }
}

export function useGetUserGroups(userId: string) {
  const [groups, setGroups] = useState();

  useEffect(() => {
    try {
      firebaseApp
        .database()
        .ref(`users/${userId}/groups`)
        .on("value", (snapshot) => {
          const result = snapshot.val() ?? {};
          setGroups(result);
        });
    } catch (e) {
      console.log("Error get grp pins:", e);
    }
  }, [userId]);

  return { groups };
}
