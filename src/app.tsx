import { useContext } from "react";
import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./app.module.scss";
import { AuthContext } from "./context/AuthContext";
import LandingPage from "./components/signup/LandingPage";
import HomeScreen from "./screens/HomeScreen";
import OnBoardingPage from "./components/signup/OnBoardingPage";
import { User, Pin, Group } from "./api/models";
import {
  getUsersInGroup,
  addMemberToGroup,
  groupAlreadyExists,
  createGroup,
} from "./api/methods/groups";
import { getUserGroups } from "./api/methods/users";
import { getGroupPins, createPin } from "./api/methods/pins";

toast.configure({
  position: "bottom-center",
  autoClose: 4000,
  limit: 3,
  transition: Zoom,
  bodyClassName: styles.toastBody,
});

function App() {
  const { user } = useContext(AuthContext);

  const renderScreen = () => {
    if (user === null) {
      return <LandingPage />;
    }

    if (!user.name) {
      return <OnBoardingPage />;
    }

    return <HomeScreen />;
  };
  return <div className={styles.app}>{renderScreen()}</div>;
}

const user: User = {
  name: "cynthialeeee",
  userId: "abc1234",
};

const user2: User = {
  name: "lolol",
  userId: "def5678",
};

const group: Group = {
  group_name: "new group yay",
  members: [],
};

const group1: Group = {
  group_name: "group1",
  members: [],
};

const group2: Group = {
  group_name: "group2",
  members: [],
};

const group3: Group = {
  group_name: "group2",
  members: [],
};

const pin1: Pin = {
  title: "test pin",
  description: "just a testing pin",
  lat: 123.4,
  long: 231,
  group_name: "new group yay",
  creator: user2,
};

const pin2: Pin = {
  title: "test pin new 2",
  description: "just a testing pin",
  lat: 442.5,
  long: 958.1,
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
  getUserGroups(user.userId).then((result) => {
    console.log("GET USER GROUPS RESULT:", result);
  });
  getUsersInGroup(group.group_name).then((result) => {
    console.log("GET GROUP USERS RESULT:", result);
  });
  getGroupPins("new group yay").then((result) => {
    console.log("GET PINS RESULT:", result);
  });
  // removeMemberFromGroup(user.user_id, "new group yay");
} catch (error) {
  console.log("ERROR:", error);
}

export default App;
