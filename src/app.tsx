import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import Map from "./components/map";
import styles from "./app.module.scss";
import SidePanel from "./components/side-panel";

toast.configure({
  position: "bottom-center",
  autoClose: 4000,
  limit: 3,
  transition: Zoom,
  bodyClassName: styles.toastBody,
});

function App() {
  return (
    <div className={styles.app}>
      <SidePanel />
    </div>
  );
}

export default App;
