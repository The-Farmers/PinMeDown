import firebaseApp from "../../authentication/firebaseConfig";
import { Group, User } from "../models";

export function createGroup(group: Group) {
  try {
    firebaseApp.database().ref(`groups/${group.group_name}`).set({
      groupName: group.group_name,
    });
  } catch (e) {
    console.log("ERROR CREATING GROUP", e);
  }
}

export async function groupAlreadyExists(group: Group) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef.child(`groups/${group.group_name}`).get();

    if (snapshot.exists()) {
      console.log("GROUP ALREADY EXISTS", snapshot.val());
      return true;
    }
    console.log("GROUP DOES NOT EXIST", snapshot.val());
    return false;
  } catch (e) {
    console.log("Error getting snapshot", e);
  }
}

export function addMemberToGroup(user: User, groupName: string) {}
