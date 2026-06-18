import useAuth from "@/hooks/useAuth";
import {
  initNearbyService,
  startAdvertise,
  startDiscovery,
  stopAdvertise,
  stopDiscovery,
} from "@/services/nearby";
import useAuthStore from "@/store/authStore";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import SplashPreview from "./screens/splashscreen";

const RootLayout = () => {
  useAuth();
  return (
    <>
      <InitialRootLayout />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default RootLayout;

let nearbyStarted = false;
function InitialRootLayout() {
  const { user, loading } = useAuthStore();

  useEffect(() => {
    async function init() {
      if (nearbyStarted) return;
      nearbyStarted = true;
      await stopAdvertise();
      await stopDiscovery();
      await initNearbyService();
      await startAdvertise();
      await startDiscovery();
      console.log("Nearby service initialized");
    }
    init();
  }, []);

  if (loading) {
    return <SplashPreview />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="screens" />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
