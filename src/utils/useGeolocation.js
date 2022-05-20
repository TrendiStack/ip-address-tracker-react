import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [loaded, setLoaded] = useState(false);
  const [coords, setCoords] = useState({
    lat: "",
    lng: "",
  });
  const onSuccess = (position) => {
    setLoaded(true);
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const onError = (error) => {
    setLoaded(true);
    setCoords({
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return coords;
};

export default useGeolocation;
