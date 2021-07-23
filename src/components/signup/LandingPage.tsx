import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { googleSignup } from "../../authentication/googleSignup";
import { signout } from "../../authentication/signout";
import { AuthContext } from "../../context/AuthContext";

function LandingPage() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Signup page</h1>
      <Button
        icon="google"
        content="Signin with Google"
        onClick={async () => {
          const user = await googleSignup();
          setUser(user);
          console.log("signed in");
        }}
      />
      <Button
        content="Sign out"
        onClick={async () => {
          await signout();
          console.log("signed out");
        }}
      />
      <div>
        <div>{user?.uid}</div>
      </div>
    </div>
  );
}

export default LandingPage;
