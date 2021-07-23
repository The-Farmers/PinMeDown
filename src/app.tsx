import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./app.module.scss";
import { SignupScreen } from "./screens/SignupScreen";
import { userAlreadyExists } from "./api/methods/users";
import { User } from "./api/models";

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
};

try {
  userAlreadyExists(user).then((exists) => {
    if (exists) {
      console.log("EXISTS");
    } else {
      console.log("NOT EXISTS");
    }
  });

  // createUser(user);
} catch (error) {
  console.log("ERROR:", error);
}

export default App;
