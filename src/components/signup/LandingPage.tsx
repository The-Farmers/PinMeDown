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
          const currUser = await googleSignup();

          if (currUser === null) {
            throw new Error("USEr null?");
            return;
          }

          const name = await getName(currUser.uid);

          console.log(name);
          setUser({ user: currUser, name: name ? (name as string) : "" });
        }}
      />
    </div>
  );
}

export default LandingPage;
