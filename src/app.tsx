import { useContext } from "react";
import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./app.module.scss";
import { AuthContext } from "./context/AuthContext";
import LandingPage from "./components/signup/LandingPage";
import HomeScreen from "./screens/HomeScreen";
import OnBoardingPage from "./components/signup/OnBoardingPage";
import { useGetGroupPins } from "./api/methods/pins";
import { useGetUserGroups } from "./api/methods/users";
import { useGetGroupUsers } from "./api/methods/groups";

toast.configure({
  position: "bottom-center",
  autoClose: 4000,
  limit: 3,
  transition: Zoom,
  bodyClassName: styles.toastBody,
});

function App() {
  const { user } = useContext(AuthContext);
  const { groups } = useGetUserGroups("ab");
  const { users } = useGetGroupUsers("new gr yay");

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

export default App;
