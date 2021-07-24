import { useRef, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { createUser } from "../../api/methods/users";
import { User } from "../../api/models";
import { AuthContext } from "../../context/AuthContext";

function OnBoardingPage() {
  const nameRef = useRef<HTMLInputElement>();

  const { user } = useContext(AuthContext);

  let hasEmptyField = true;
  const onSubmit = () => {
    const name = nameRef.current?.value?.trim();
    const user_id = user?.user?.uid;

    if (!name || !user_id) {
      hasEmptyField = true;
      return;
    }
    hasEmptyField = false;
    const userValues: User = {
      user_id,
      name,
    };
    createUser(userValues);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Input label="Name" input={{ ref: nameRef }} />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default OnBoardingPage;
