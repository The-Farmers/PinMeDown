import { useState, useCallback, memo, useRef, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import { Button, Form, Modal, TextArea } from "semantic-ui-react";
import useGeolocation from "../../custom-hooks/use-geolocation";
import PlaceholderWrapper from "../placeholder-wrapper";
import styles from "./map.module.scss";
import { createPin } from "../../api/methods/pins";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../api/models";
import { GroupContext } from "../../context-provider/group-provider";

const DEFAULT_CENTER: google.maps.LatLngLiteral = {
  lat: 1.2949,
  lng: 103.7737,
};
const DEFAULT_ZOOM = 18;

const MARKER_CLUSTERER_OPTIONS = {
  imagePath: "assets/map/m",
};

const locations: google.maps.LatLngLiteral[] = [
  { lat: 1.29, lng: 103.7717 },
  { lat: 1.2958, lng: 103.7747 },
  { lat: 1.2948, lng: 103.7736 },
  { lat: 1.2927, lng: 103.7758 },
];

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Map() {
  const { geolocation } = useGeolocation();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currLatLong, setCurrLatLong] = useState(DEFAULT_CENTER);

  const inputRef = useRef<HTMLInputElement>();
  const descRef = useRef<HTMLTextAreaElement>();
  const { user } = useContext(AuthContext);
  const { selectedGroup } = useContext(GroupContext);

  const onUnmount = useCallback(() => setMap(undefined), []);

  const openModal = ({ latLng }: google.maps.MapMouseEvent) => {
    if (latLng?.lat && latLng.lng) {
      setCurrLatLong({ lat: latLng.lat(), lng: latLng.lng() });
    } else {
      alert("cannot get coordinates.");
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addPin = () => {
    const newtitle = inputRef?.current?.value;
    const desc = descRef?.current?.value;

    if (newtitle && desc) {
      const currentUser: User = {
        userId: user?.user.uid ?? "",
        name: user?.name ?? "",
      };
      const newPin = {
        title: newtitle,
        description: desc,
        ...currLatLong,
        creator: currentUser,
        group_name: "",
      };
      createPin(newPin);
      closeModal();
    } else {
      alert("Fields must be entered.");
    }
  };

  return (
    <>
      <Modal size="tiny" open={isModalOpen}>
        <Modal.Header>
          Adding a pin to {currLatLong.lat}, {currLatLong.lng}
        </Modal.Header>
        <Modal.Content>
          <Form.Field>
            <Form.Input
              input={{ ref: inputRef }}
              size="large"
              placeholder="Title"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              input={{ ref: descRef }}
              rows="3"
              placeholder="Description ..."
            />
          </Form.Field>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button positive type="submit" onClick={addPin}>
            Start
          </Button>
        </Modal.Actions>
      </Modal>

      <PlaceholderWrapper
        placeholder
        loading={!loadError && (geolocation === undefined || !isLoaded)}
        loadingMessage="Loading map"
        showDefaultMessage={Boolean(loadError)}
        defaultMessage={
          loadError?.message ?? "An error has occurred while loading the map"
        }
      >
        <GoogleMap
          mapContainerClassName={styles.map}
          onLoad={setMap}
          onUnmount={onUnmount}
          onClick={openModal}
          zoom={DEFAULT_ZOOM}
          center={
            geolocation
              ? { lat: geolocation.latitude, lng: geolocation.longitude }
              : DEFAULT_CENTER
          }
        >
          {selectedGroup && (
            <MarkerClusterer options={MARKER_CLUSTERER_OPTIONS}>
              {(clusterer) =>
                Object.values(selectedGroup.pins).map(({ lat, lng }, index) => (
                  <Marker
                    key={index}
                    position={{ lat, lng }}
                    label={labels[index % labels.length]}
                    clusterer={clusterer}
                  />
                ))
              }
            </MarkerClusterer>
          )}
          <Marker position={currLatLong} />
        </GoogleMap>
      </PlaceholderWrapper>
    </>
  );
}

export default memo(Map);
