import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import SignupScreen from "./screens/SignupScreen";
import {
  createUser,
  getUserGroups,
  userAlreadyExists,
} from "./api/methods/users";
import { User, Group, Pin } from "./api/models";
import {
  addMemberToGroup,
  createGroup,
  getUsersInGroup,
  groupAlreadyExists,
  removeMemberFromGroup,
} from "./api/methods/groups";
import Map from "./components/map";
import styles from "./app.module.scss";
import { LONGITUDE } from "./api/constants";
import { createPin, getGroupPins } from "./api/methods/pins";

toast.configure({
  position: "bottom-center",
  autoClose: 4000,
  limit: 3,
  transition: Zoom,
  bodyClassName: styles.toastBody,
});

function App() {
  return (
    <div className={styles.app}>
      <SignupScreen />
      <Map />
    </div>
  );
}

const user: User = {
  name: "cynthialeeee",
  user_id: "abc1234",
};

const user2: User = {
  name: "lolol",
  user_id: "def5678",
};

const group: Group = {
  group_name: "new group yay",
  members: [],
};

const pin1: Pin = {
  title: "test pin",
  description: "just a testing pin",
  latitude: 123.4,
  longitude: 231,
  group_name: "new group yay",
  creator: user2,
};

const pin2: Pin = {
  title: "test pin new 2",
  description: "just a testing pin",
  latitude: 442.5,
  longitude: 958.1,
  group_name: "new group yay",
  creator: user,
};

try {
  // userAlreadyExists(user2).then((exists) => {
  //   if (exists) {
  //     console.log("EXISTS");
  //   } else {
  //     createUser(user2);
  //   }
  // });

  // groupAlreadyExists(group).then((exists) => {
  //   if (exists) {
  //     console.log("EXISTS");
  //   } else {
  //     createGroup(user, "new group yay");
  //   }
  // });
  // addMemberToGroup(user2, "new group yay");

  // createPin(pin1);

  // getUserGroups(user.user_id);
  // getUsersInGroup(group.group_name);
  getGroupPins("new group yay");

  // removeMemberFromGroup(user.user_id, "new group yay");
} catch (error) {
  console.log("ERROR:", error);
}

export default App;
