import useAuth from "@/hooks/useAuth";
import useAuthStore from "@/store/authStore";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";

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

function InitialRootLayout() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
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
