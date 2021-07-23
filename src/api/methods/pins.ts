import firebaseApp from "../../authentication/firebaseConfig";
import { User, Pin } from "../models";

export function createPin(pin: Pin) {
  try {
    // TODO: Check if group exists

    // Check if pin with title already exists
    firebaseApp
      .database()
      .ref(`groups/${pin.group_name}/pins/${pin.title}`)
      .set({
        pin_description: pin.description,
        latitude: pin.latitude,
        longitude: pin.longitude,
        creator: pin.creator,
      });
  } catch (e) {
    console.log("ERROR CREATING GROUP", e);
  }
}

export async function pinAlreadyExists(groupName: string, pinTitle: string) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef
      .child(`groups/${groupName}/pins/${pinTitle}`)
      .get();

    if (snapshot.exists()) {
      console.log("PIN ALREADY EXISTS", snapshot.val());
      return true;
    }
    console.log("PIN DOES NOT EXIST", snapshot.val());
    return false;
  } catch (e) {
    console.log("Error getting snapshot", e);
  }
}

export async function getGroupPins(groupName: string) {
  try {
    const dbRef = firebaseApp.database().ref();
    const snapshot = await dbRef.child(`groups/${groupName}/pins/`).get();
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  } catch (e) {
    console.log("Get user groups", e);
  }
  return [];
}
