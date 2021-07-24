import { useRef, useState } from "react";
import SidePanel from "../side-panel/side-panel";
import Map from "../map";
import styles from "./app-layout-container.module.scss";

function AppLayoutContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sidePanelWidth, setSidePanelWidth] = useState(window.innerWidth / 2);
  const [isResizing, setResizing] = useState(false);

  return (
    <div
      onMouseUpCapture={() => setResizing(false)}
      onMouseLeave={() => setResizing(false)}
      onMouseMove={({ clientX }) =>
        isResizing &&
        setSidePanelWidth(
          Math.max(300, Math.min(window.innerWidth - 300, clientX)),
        )
      }
      ref={containerRef}
      className={styles.layoutContainer}
    >
      <div style={{ width: sidePanelWidth }}>
        <SidePanel />
      </div>

      <div
        onMouseDown={() => setResizing(true)}
        className={styles.resizeContainer}
      />

      <div className={styles.mapContainer}>
        <Map />
      </div>
    </div>
  );
}

export default AppLayoutContainer;
