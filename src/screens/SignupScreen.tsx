import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { googleSignup } from "../authentication/googleSignup";
import { signout } from "../authentication/signout";
import { AuthContext } from "../context/AuthContext";

export function SignupScreen() {
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
        <text>{user?.uid}</text>
      </div>
    </div>
  );
}
