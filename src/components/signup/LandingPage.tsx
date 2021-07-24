import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { googleSignup } from "../../authentication/googleSignup";
import { AuthContext } from "../../context/AuthContext";
import { getName, userAlreadyExists } from "../../api/methods/users";

function LandingPage() {
  const { setUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Signup page</h1>
      <Button
        icon="google"
        content="Signin with Google"
        onClick={async () => {
          const user = await googleSignup();
          const userExists = await userAlreadyExists(user?.uid);

          if (user === null) {
            return;
          }

          const name = await getName(user.uid);

          setUser({ user, name: userExists ? name : "" });
        }}
      />
    </div>
  );
}

export default LandingPage;
