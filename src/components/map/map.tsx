import { useState, useCallback, memo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import useGeolocation from "../../custom-hooks/use-geolocation";
import PlaceholderWrapper from "../placeholder-wrapper";
import styles from "./map.module.scss";

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

  const onUnmount = useCallback(() => setMap(undefined), []);

  return (
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
        zoom={DEFAULT_ZOOM}
        center={
          geolocation
            ? { lat: geolocation.latitude, lng: geolocation.longitude }
            : DEFAULT_CENTER
        }
      >
        <MarkerClusterer options={MARKER_CLUSTERER_OPTIONS}>
          {(clusterer) =>
            locations.map((location, index) => (
              <Marker
                key={index}
                position={location}
                label={labels[index % labels.length]}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </PlaceholderWrapper>
  );
}

export default memo(Map);
