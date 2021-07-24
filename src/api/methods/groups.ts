import firebaseApp from "../../authentication/firebaseConfig";
import { Group, User } from "../models";

export function createGroup(creator: User, groupName: string) {
  try {
    firebaseApp.database().ref(`groups/${groupName}`).set({
      group_name: groupName,
    });
    addMemberToGroup(creator, groupName);
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

export function addMemberToGroup(user: User, groupName: string) {
  try {
    firebaseApp
      .database()
      .ref(`groups/${groupName}/members/${user.userId}`)
      .set({
        name: user.name,
      });
    // Add group to members' groups
    firebaseApp.database().ref(`users/${user.userId}/groups/${groupName}`).set({
      group_name: groupName,
    });
  } catch (e) {
    console.log("ERROR CREATING GROUP", e);
  }
}

export async function removeMemberFromGroup(userId: string, groupName: string) {
  try {
    firebaseApp.database().ref(`users/${userId}/groups/${groupName}`).remove();

    const groupRef = firebaseApp.database().ref(`groups/${groupName}/`);

    groupRef.child(`members/${userId}`).remove();

    // Remove group if no more members
    const snapshot = await groupRef.child(`members/`).get();
    if (!snapshot.exists()) {
      console.log("NO MORE MEMBERS: REMOVE PLS");
      groupRef.remove();
    }
  } catch (e) {
    console.log("ERROR REMOVING MEMBER FROM GROUP", e);
  }
}

export async function getUsersInGroup(groupName: string) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef.child(`groups/${groupName}/members/`).get();
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  } catch (e) {
    console.log("ERROR GET USERS IN GROUP", e);
  }
}
