import React, { useEffect, useState } from "react";

export default function UseGeoLocation() {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    error: null,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            error: null,
          });
        },
        (err) => {
          setLocation({
            lat: null,
            lng: null,
            error:
              "Please enable location services in your browser to use this feature",
          });
        }
      );
    } else {
      setLocation({
        lat: null,
        lng: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  return location;
}
