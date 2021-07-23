import GoogleMapReact from "google-map-react";
import { useState } from "react";
import useGeolocation from "react-hook-geolocation";
import PlaceholderWrapper from "../placeholder-wrapper";

function Map() {
  const [loaded, setLoaded] = useState(false);
  const { latitude: lat, longitude: lng } = useGeolocation({}, () =>
    setLoaded(true),
  );

  return (
    <PlaceholderWrapper
      placeholder
      loading={!loaded}
      loadingMessage="Loading map"
      showDefaultMessage={lat === null || lng === null}
      defaultMessage="Location service not enabled"
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={{ lat, lng }}
        defaultZoom={11}
      />
    </PlaceholderWrapper>
  );
}

export default Map;
