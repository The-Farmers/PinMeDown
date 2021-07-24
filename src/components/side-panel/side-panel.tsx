import { useContext } from "react";
import { Tab, Button } from "semantic-ui-react";
import MyGroupsTab from "../my-groups-tab";
import SearchTab from "../search-tab";
import styles from "./side-panel.module.scss";
import { signout } from "../../authentication/signout";
import { AuthContext } from "../../context/AuthContext";

// const panes = [
//   {
//     menuItem: "My Groups",
//     render: () => (
//       <Tab.Pane className={styles.tabPanel} attached={false}>
//         <MyGroupsTab />
//       </Tab.Pane>
//     ),
//   },
//   {
//     menuItem: "Search Groups",
//     render: () => (
//       <Tab.Pane className={styles.tabPanel} attached={false}>
//         <SearchTab />
//       </Tab.Pane>
//     ),
//   },
// ];

function SidePanel() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.sidePanel}>
      <div className={styles.topBar}>
        <Button
          content="Sign out"
          onClick={signout}
          basic
          compact
          color="blue"
          icon="sign out"
          className={styles.signOutButton}
        />
        {user && <strong>{user.name}</strong>}
      </div>

      <div className={styles.tabPanel}>
        <MyGroupsTab />
      </div>
    </div>
  );
}

export default SidePanel;
