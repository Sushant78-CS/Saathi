import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Location permission denied");
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  const coords = {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  };
  const res = await Location.reverseGeocodeAsync({
    latitude: coords.lat,
    longitude: coords.lng,
  });
  if (res.length > 0) {
    const place = res[0];
    const formatted = `${place.name || ""}, ${place.street || ""}, ${place.city || ""}`;
    console.log(formatted);
    return {
      latitude: coords.lat,
      longitude: coords.lng,
      address: formatted,
    };
  }
  return null;
};
