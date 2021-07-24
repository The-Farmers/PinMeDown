import { Tab } from "semantic-ui-react";
import styles from "./side-panel.module.scss";
import PublicGroups from "./public-groups";
import MyGroups from "./my-groups";
import { Group } from "../../types";

const myGroup: Group[] = [
  {
    groupName: "Family",
    pins: [{ title: "pin1", description: "asfvafdv" }],
    members: ["max"],
  },
  {
    groupName: "dorm friends",
    pins: [{ title: "pin2", description: "jcfdaskbcnkdusvb" }],
    members: ["max"],
  },
  {
    groupName: "gang gang",
    pins: [{ title: "pin3", description: "asfvdsacajsblisdnlisafdv" }],
    members: ["max"],
  },
  {
    groupName: "hot girl summer",
    pins: [{ title: "pin4", description: "asfvafdv" }],
    members: ["max"],
  },
];

const publicGroups: Group[] = [
  {
    groupName: "public group 1",
    pins: [{ title: "pin4", description: "never wanna give u up" }],
    members: ["max"],
  },
  {
    groupName: "best date spots",
    pins: [{ title: "pin4", description: "never gonna let u down" }],
    members: ["max"],
  },
  {
    groupName: "great food here",
    pins: [{ title: "pin4", description: "never gonna turn around" }],
    members: ["max"],
  },
  {
    groupName: "Max's friends only",
    pins: [{ title: "pin4", description: "and desert you" }],
    members: ["max"],
  },
  {
    groupName: "Family",
    pins: [{ title: "pin4", description: "asfvafdv" }],
    members: ["max"],
  },
  {
    groupName: "dorm friends",
    pins: [{ title: "pin4", description: "jcfdaskbcnkdusvb" }],
    members: ["max"],
  },
  {
    groupName: "gang gang",
    pins: [{ title: "pin4", description: "asfvdsacajsblisdnlisafdv" }],
    members: ["max"],
  },
  {
    groupName: "hot girl summer",
    pins: [{ title: "pin4", description: "asfvafdv" }],
    members: ["max"],
  },
];

const addNewGroup = (groupToAdd: Group) => {
  myGroup.push(groupToAdd);
  publicGroups.push(groupToAdd);
};
const addIndexToMyGroup = (indexToAdd: number) => {
  publicGroups[indexToAdd].members.push(""); // users own name
  myGroup.push(publicGroups[indexToAdd]);
};
const removeFromMyGroup = (groupToRemove: number) => {
  const removeIndex = myGroup.findIndex(
    (group) => group === myGroup[groupToRemove],
  );
  myGroup.splice(removeIndex, 1);
  groupToRemove;
};

const panes = [
  {
    menuItem: "Public Groups",
    render: () => (
      <Tab.Pane attached={false}>
        <PublicGroups
          publicGroups={publicGroups}
          addNewGroup={addNewGroup}
          addIndexToMyGroup={addIndexToMyGroup}
        />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "My Groups",
    render: () => (
      <Tab.Pane attached={false}>
        <MyGroups myGroup={myGroup} removeFromMyGroup={removeFromMyGroup} />
      </Tab.Pane>
    ),
  },
];

function SidePanel() {
  return (
    <Tab menu={{ secondary: true }} panes={panes} className={styles.section} />
  );
}

export default SidePanel;
