import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const handleGeolocationError = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED: {
      toast.error(
        "To get current location, please allow location access for this application.",
      );
      break;
    }
    case error.POSITION_UNAVAILABLE: {
      toast.error("Location is unavailable.");
      break;
    }
    case error.TIMEOUT: {
      toast.error("The request to get current location has timed out.");
      break;
    }
    default: {
      toast.error("An unknown error has occurred.");
    }
  }
};

export default function useGeolocation() {
  const [geolocation, setGeolocation] =
    useState<GeolocationCoordinates | null>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setGeolocation(coords);
        },
        (error) => {
          handleGeolocationError(error);
          setGeolocation(null);
        },
      );
    } else {
      toast.error("Geolocation is not supported for this Browser/OS.");
      setGeolocation(null);
    }
  }, []);

  return { geolocation };
}
