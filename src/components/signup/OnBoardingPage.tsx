import { useRef, useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { createUser } from "../../api/methods/users";
import { User } from "../../api/models";
import { AuthContext } from "../../context/AuthContext";

function OnBoardingPage() {
  const nameRef = useRef<HTMLInputElement>();

  const [hasEmptyField, setHasEmptyField] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const onSubmit = () => {
    const name = nameRef.current?.value?.trim();
    const firebaseUser = user?.user;
    const user_id = firebaseUser?.uid;

    if (!name || !user_id) {
      setHasEmptyField(true);
      return;
    }
    if (!firebaseUser) {
      console.log("There is no user defined");
      return;
    }

    setHasEmptyField(false);
    const userValues: User = {
      user_id,
      name,
    };

    createUser(userValues);
    setUser({ user: firebaseUser, name });
  };

  return (
    <div>
      {hasEmptyField ? <h3>Field cannot be blank</h3> : null}
      <Form onSubmit={onSubmit}>
        <Form.Input label="Name" input={{ ref: nameRef }} />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default OnBoardingPage;
