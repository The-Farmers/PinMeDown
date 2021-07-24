import { ReactNode, useRef, useState } from "react";
import Map from "../map";
import styles from "./app-layout-container.module.scss";
import GroupProvider from "../../context-provider/group-provider";

type Props = {
  children: ReactNode;
};

function AppLayoutContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sidePanelWidth, setSidePanelWidth] = useState(window.innerWidth / 2);
  const [isResizing, setResizing] = useState(false);

  return (
    <GroupProvider>
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
        <div
          className={styles.sidePanelContainer}
          style={{ width: sidePanelWidth }}
        >
          {children}
        </div>

        <div
          onMouseDown={() => setResizing(true)}
          className={styles.resizeContainer}
        />

        <div className={styles.mapContainer}>
          <Map />
        </div>
      </div>
    </GroupProvider>
  );
}

export default AppLayoutContainer;
