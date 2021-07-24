import { toast, Zoom } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "./app.module.scss";
import AppLayoutContainer from "./components/app-layout-container";

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
      <AppLayoutContainer />
    </div>
  );
}

export default App;
