import { Fragment, useState } from "react";
import { Accordion, Button, Icon } from "semantic-ui-react";
import { Group } from "../../../types";
import styles from "./my-groups.module.scss";

type Props = {
  myGroup: Group[];
  removeFromMyGroup: (groupToRemove: number) => void;
};

function MyGroups({ myGroup, removeFromMyGroup }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasLeaveButton, setLeaveButton] = useState(false);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    const hasLeaveButton = newIndex >= 0;

    setLeaveButton(hasLeaveButton);
    setActiveIndex(newIndex);
  };

  const leaveGroup = (index: number) => {
    removeFromMyGroup(index);
  };

  return (
    <Accordion fluid styled>
      {myGroup.map(({ groupName, pins }, index) => (
        <Fragment key={index}>
          <Accordion.Title
            active={index === activeIndex}
            index={index}
            onClick={handleClick}
            className={styles.title_section}
          >
            <Icon name="dropdown" />
            {groupName}
            {hasLeaveButton && index === activeIndex && (
              <div className={styles.leave_button}>
                <Button color="orange" onClick={() => leaveGroup(index)}>
                  Leave
                </Button>
              </div>
            )}
          </Accordion.Title>
          <Accordion.Content active={index === activeIndex}>
            <div className={styles.content_section}>
              <ul>
                {pins?.map(({ title, description }) => (
                  <li>
                    <b>{title}</b>: {description}
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Content>
        </Fragment>
      ))}
    </Accordion>
  );
}

export default MyGroups;
