import { useContext } from "react";
import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./app.module.scss";
import { AuthContext } from "./context/AuthContext";
import AppLayoutContainer from "./components/app-layout-container";
import SidePanel from "./components/side-panel";
import OnBoardingPage from "./components/signup/OnBoardingPage";
import LandingPage from "./components/signup/LandingPage";

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

    return <SidePanel />;
  };
  return (
    <div className={styles.app}>
      <AppLayoutContainer>{renderScreen()}</AppLayoutContainer>
    </div>
  );
}

export default App;
