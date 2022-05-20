import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [coords, setCoords] = useState({
    lat: "",
    lng: "",
  });
  const onSuccess = (position) => {
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const onError = (error) => {
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
