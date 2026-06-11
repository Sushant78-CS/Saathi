import NetInfo from "@react-native-community/netinfo";
import * as Nearby from "expo-nearby-connections";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import { savePendingSOS } from "./offlinesos";
import createSOSAlert from "./sos";

export const SERVICE_ID = "com.safara.sos";

const requestPermission = async () => {
  if (Platform.OS !== "android") return;
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
    PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
  ]);
};

export const startAdvertise = async () => {
  await requestPermission();
  await Nearby.startAdvertise(SERVICE_ID, Nearby.Strategy.P2P_CLUSTER);

  console.log("[Nearby] Advertising started");
};

export const startDiscovery = async () => {
  await requestPermission();
  await Nearby.startDiscovery(SERVICE_ID, Nearby.Strategy.P2P_CLUSTER);

  console.log("[Nearby] Discovery started");
};

export const stopDiscovery = async () => {
  await Nearby.disconnect();
  await Nearby.stopDiscovery();

  console.log("[Nearby] Discovery stopped");
};

export const stopAdvertise = async () => {
  await Nearby.disconnect();
  await Nearby.stopAdvertise();

  console.log("[Nearby] Advertising stopped");
};

const connectedPeers = new Set<string>();

let initialized = false;
export const initNearbyService = async () => {
  console.log("[Nearby] initNearbyService called");
  if (initialized) return;
  initialized = true;

  Nearby.onInvitationReceived((request) => {
    console.log("[Nearby] Invitation received:", request.peerId);
    Nearby.acceptConnection(request.peerId)
      .then(() => console.log("[Nearby] Accepted"))
      .catch((error) => console.error("[Nearby] Accept error:", error));
  });

  Nearby.onConnected((peer) => {
    console.log("[Nearby] Connected to peer:", peer.peerId);
    connectedPeers.add(peer.peerId);
  });

  Nearby.onDisconnected((peer) => {
    console.log("[Nearby] Disconnected from peer:", peer.peerId);
    connectedPeers.delete(peer.peerId);
  });

  Nearby.onTextReceived(async ({ peerId, text }) => {
    console.log("[Nearby] Message received from:", peerId);
    console.log("[Nearby] Raw text:", text);

    try {
      const payload = JSON.parse(text);
      if (payload.type !== "SOS") return;
      if ((payload.hopCount ?? 0) >= 3) return;

      Alert.alert(
        "🚨 SOS Nearby!",
        `${payload.name} needs help!\n\nLocation: ${payload.address}`,
        [
          {
            text: "Open Maps",
            onPress: () => {
              Linking.openURL(
                `https://maps.google.com/?q=${payload.latitude},${payload.longitude}`,
              );
            },
          },
          { text: "OK" },
        ],
      );

      const net = await NetInfo.fetch();
      console.log("[Nearby] Network info:", net);

      if (net.isConnected) {
        await createSOSAlert({
          userId: payload.userId || "",
          latitude: payload.latitude,
          longitude: payload.longitude,
          locationName: payload.address,
          address: payload.address,
          name: payload.name || "",
          bloodGroup: payload.bloodGroup || "",
          age: payload.age || "",
          emergencyContacts: payload.emergencyContacts || [],
          status: "ACTIVE",
        });
        console.log("[Nearby] SOS alert created", payload.name);
      } else {
        await savePendingSOS(payload);
        console.log("[Nearby] SOS alert saved for later", payload.name);
      }
    } catch (error) {
      console.error("[Nearby] Error handling text:", error);
    }
  });

  console.log("[Nearby] Service initialized");
};

export const broadcastSOS = async (payload: any) => {
  console.log("Connected peers count:", connectedPeers.size);

  for (const peerId of connectedPeers) {
    try {
      await Nearby.sendText(peerId, JSON.stringify(payload));
      console.log("[Nearby] Payload:", JSON.stringify(payload, null, 2));
      console.log("[Nearby] SOS broadcasted to:", peerId);
    } catch (error) {
      console.error("[Nearby] Error broadcasting SOS:", peerId, error);
    }
  }

  Nearby.onDisconnected((peer) => {
    console.log("[Nearby] Disconnected from peer:", peer.peerId);
  });
};

export default Nearby;
