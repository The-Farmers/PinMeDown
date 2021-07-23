import firebaseApp from "../../authentication/firebaseConfig";
import { User } from "../models";

export function createGroup(users: User[], groupName: string) {
  firebaseApp
    .database()
    .ref(`groups/${groupName}`)
    .set({
      members: ["jeremy"],
    });
}
