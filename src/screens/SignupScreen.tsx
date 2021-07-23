import firebase from "firebase";
import LandingPage from "../components/signup/LandingPage";
import OnBoardingPage from "../components/signup/OnBoardingPage";
import HomeScreen from "./HomeScreen";

function SignupScreen() {
  let userIsLoggedIn = false;
  let userHasOnBoarded = false;
  const user: firebase.User | null = firebase.auth().currentUser;
  if (user) {
    userIsLoggedIn = true;
  }

  const renderComponent = () => {
    if (userIsLoggedIn) {
      return <HomeScreen />;
    } else if (userHasOnBoarded) {
      return <LandingPage />;
    } else {
      return <OnBoardingPage />;
    }
  };
  return <div>{renderComponent()}</div>;
}

export default SignupScreen;
