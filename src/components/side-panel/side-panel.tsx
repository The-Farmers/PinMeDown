import { Tab, Button } from "semantic-ui-react";
import { useContext } from "react";
import MyGroupsTab from "../my-groups-tab";
import SearchTab from "../search-tab";
import styles from "./side-panel.module.scss";
import { signout } from "../../authentication/signout";
import { StateContext } from "../../context/StateContext";

const panes = [
  {
    menuItem: "My Groups",
    render: () => (
      <Tab.Pane className={styles.tabPanel} attached={false}>
        <MyGroupsTab />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Search Groups",
    render: () => (
      <Tab.Pane className={styles.tabPanel} attached={false}>
        <SearchTab />
      </Tab.Pane>
    ),
  },
];

function SidePanel() {
  const { setState } = useContext(StateContext);
  return (
    <div className={styles.sidePanel}>
      <Button
        content="Sign out"
        onClick={async () => {
          await signout();
          setState("loggedOut");
          console.log("signed out");
        }}
        basic
        compact
        color="blue"
        icon="sign out"
        className={styles.signOutButton}
      />
      <Tab menu={{ secondary: true, className: styles.menu }} panes={panes} />
    </div>
  );
}

export default SidePanel;
