import HeaderCard from "@/components/HeaderCard";
import { LocationCard } from "@/components/LocationCard";
import { QuickActionCard } from "@/components/QuickActonCard";
import { SosButton } from "@/components/SosButton";
import { scanBluetoothDevices } from "@/services/ble";
import { requestBluetoothPermission } from "@/services/bluepermission";
import { getCurrentLocation } from "@/services/location";
import { savePendingSOS } from "@/services/offlinesos";
import createSOSAlert from "@/services/sos";
import { uploadPendingSOS } from "@/services/uploadpendingsos";
import useAuthStore from "@/store/authStore";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [location, setLocation] = useState<string | null>(null);
  const [sosLocation, setSosLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const [countDown, setCountDown] = useState<number | null>(null);
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    getCurrentLocation().then((loc) => {
      setLocation(loc?.address || "Not Found");
    });
  }, [user]);

  useEffect(() => {
    if (countDown == null) return;
    if (countDown === 0) {
      sendSOS();
      setCountDown(null);
      return;
    }

    const timer = setTimeout(() => {
      setCountDown((prev) => (prev ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [countDown]);

  useEffect(() => {
    const unSubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        await uploadPendingSOS();
      }
    });

    return unSubscribe;
  }, []);

  const handleSOS = async () => {
    setCountDown(5);
    try {
      const location = await getCurrentLocation();
      setSosLocation({
        address: location?.address || "Unknown",
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const cancelSOS = () => {
    setCountDown(null);
    setSosLocation(null);
  };

  const sendSOS = async () => {
    if (!sosLocation) return;
    const state = await NetInfo.fetch();
    try {
      if (!state.isConnected) {
        await savePendingSOS({
          latitude: sosLocation.latitude,
          longitude: sosLocation.longitude,
          address: sosLocation.address,
          createdAt: Date.now(),
        });
        console.log("SOS saved offline");
        return;
      }

      await createSOSAlert(
        sosLocation.latitude,
        sosLocation.longitude,
        sosLocation.address,
      );

      console.log("Connected:", state.isConnected);
      console.log("SOS Location:", sosLocation);
      return;
    } catch (err) {
      console.error("Error saving SOS:", err);
    }
  };

  const testBluetooth = async () => {
    const granted = await requestBluetoothPermission();

    if (!granted) {
      console.log("Bluetooth permission denied");
      return;
    }

    scanBluetoothDevices();
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCard user={user} />
      <LocationCard location={location || "Not Found"} />
      <SosButton
        handleSOS={handleSOS}
        cancelSOS={cancelSOS}
        countDown={countDown}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#f0f0f0",
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={testBluetooth}
      >
        <Text>Bluetooth</Text>
      </TouchableOpacity>
      <QuickActionCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
