import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./app.module.scss";
import SignupScreen from "./screens/SignupScreen";
import { createUser, userAlreadyExists } from "./api/methods/users";
import { User, Group } from "./api/models";
import { createGroup, groupAlreadyExists } from "./api/methods/groups";

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
    </div>
  );
}

const user: User = {
  name: "cynthialeeee",
  user_id: "abc1234",
};

const group: Group = {
  group_name: "new group yay",
  members: [user, user],
};

try {
  userAlreadyExists(user).then((exists) => {
    if (exists) {
      console.log("EXISTS");
    } else {
      createUser(user);
    }
  });

  groupAlreadyExists(group).then((exists) => {
    if (exists) {
      console.log("EXISTS");
    } else {
      createGroup(group);
    }
  });
} catch (error) {
  console.log("ERROR:", error);
}

export default App;
