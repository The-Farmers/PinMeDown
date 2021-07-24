import { Tab } from "semantic-ui-react";
import MyGroupsTab from "../my-groups-tab";
import SearchTab from "../search-tab";
import styles from "./side-panel.module.scss";

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
  return (
    <div className={styles.sidePanel}>
      <Tab menu={{ secondary: true, className: styles.menu }} panes={panes} />
    </div>
  );
}

export default SidePanel;
