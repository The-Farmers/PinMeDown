import { Button } from "semantic-ui-react";
import { useContext } from "react";
import { signout } from "../authentication/signout";
import { StateContext } from "../context/StateContext";

function HomeScreen() {
  const { setState } = useContext(StateContext);
  return (
    <div>
      <div>placeholder for home</div>
      <Button
        content="Sign out"
        onClick={async () => {
          await signout();
          setState("loggedOut");
          console.log("signed out");
        }}
      />
    </div>
  );
}

export default HomeScreen;
