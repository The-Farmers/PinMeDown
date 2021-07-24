import clsx from "clsx";
import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { googleSignup } from "../../authentication/googleSignup";
import { AuthContext } from "../../context/AuthContext";
import { getName } from "../../api/methods/users";
import styles from "./LandingPage.module.scss";

function LandingPage() {
  const { setUser } = useContext(AuthContext);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        className={clsx(styles.googleButton, styles.important)}
        icon={{
          name: "google",
          className: styles.icon,
        }}
        content="Signin with Google"
        onClick={async () => {
          const currUser = await googleSignup();

          if (currUser === null) {
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
