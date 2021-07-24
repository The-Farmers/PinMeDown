import { Fragment, useState, useRef } from "react";
import {
  Accordion,
  Icon,
  Button,
  Modal,
  Form,
  TextArea,
} from "semantic-ui-react";
import { Group } from "../../../types";
import styles from "./public-groups.module.scss";

type Props = {
  publicGroups: Group[];
  addNewGroup: (groupToAdd: Group) => void;
  addIndexToMyGroup: (indexToAdd: number) => void;
};

function PublicGroups({ publicGroups, addNewGroup, addIndexToMyGroup }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasJoinButton, setJoinButton] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    const hasJoinButton = newIndex >= 0;

    setJoinButton(hasJoinButton);
    setActiveIndex(newIndex);
  };

  const joinGroup = (index: number) => {
    addIndexToMyGroup(index);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const startGroup = () => {
    const newGroupName = inputRef?.current?.value;

    console.log(newGroupName);
    if (newGroupName) {
      addNewGroup({ groupName: newGroupName, members: [""] }); // users own name
    } else {
      alert("Unsuccessful");
    }
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Modal open={isModalOpen}>
        <Modal.Header>Enter a unique group name</Modal.Header>
        <Modal.Content>
          <Form.Field>
            <Form.Input
              input={{ ref: inputRef }}
              size="large"
              placeholder="Group name"
            />
          </Form.Field>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={toggleModal}>Cancel</Button>
          <Button positive type="submit" onClick={startGroup}>
            Start
          </Button>
        </Modal.Actions>
      </Modal>

      <div className={styles.top_section}>
        <Button primary onClick={toggleModal}>
          Start a group
        </Button>
      </div>

      <Accordion fluid styled>
        {publicGroups.map(({ groupName, members }, index) => (
          <Fragment key={index}>
            <Accordion.Title
              active={index === activeIndex}
              index={index}
              onClick={handleClick}
              className={styles.title_section}
            >
              <Icon name="dropdown" />
              {groupName}
              {hasJoinButton && index === activeIndex && (
                <div className={styles.join_button}>
                  <Button positive onClick={() => joinGroup(index)}>
                    Join
                  </Button>
                </div>
              )}
            </Accordion.Title>
            <Accordion.Content active={index === activeIndex}>
              <div className={styles.content_section}>
                <ul>
                  {members.map((member) => (
                    <li>{member}</li>
                  ))}
                </ul>
              </div>
            </Accordion.Content>
          </Fragment>
        ))}
      </Accordion>
    </>
  );
}

export default PublicGroups;
