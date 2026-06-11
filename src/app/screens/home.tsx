import {
  HeaderCard,
  LocationCard,
  NearbyCard,
  QuickActionCard,
  SMSCard,
  SosButton,
} from "@/components";
import { getCurrentLocation } from "@/services/location";
import { broadcastSOS } from "@/services/nearby";
import { savePendingSOS } from "@/services/offlinesos";
import { sendEmergencySMS } from "@/services/sms";
import createSOSAlert, { SOSAlert } from "@/services/sos";
import { uploadPendingSOS } from "@/services/uploadpendingsos";
import useAuthStore from "@/store/authStore";
import NetInfo from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const { user, profile } = useAuthStore();
  const [location, setLocation] = useState<string | null>(null);
  const [sosLocation, setSosLocation] = useState<SOSAlert | null>(null);
  const [countDown, setCountDown] = useState<number | null>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    const loadLocation = async () => {
      try {
        setLocationLoading(true);

        const loc = await getCurrentLocation();
        setLocation(loc?.address || "Not Found");
      } catch (err) {
        console.error("Error loading location:", err);
        setLocation("Not Found");
      } finally {
        setLocationLoading(false);
      }
    };
    loadLocation();
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
        userId: user?.uid || "",
        address: location?.address || "Unknown",
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        locationName: location?.address || "Unknown",
        name: user?.displayName || "",
        emergencyContacts: profile?.emergencyContact || [],
        status: "ACTIVE",
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

    const message = `
🚨 EMERGENCY SOS

Name: ${sosLocation.name}

📍 Address:
${sosLocation.address}

🗺️ Live Location:
https://maps.google.com/?q=${sosLocation.latitude},${sosLocation.longitude}

⏰ Time:
${new Date().toLocaleString()}

This alert was sent from Safara.
Please contact or assist immediately.
`;

    try {
      if (!state.isConnected) {
        const payload = {
          type: "SOS",
          userId: sosLocation.userId,
          latitude: sosLocation.latitude,
          longitude: sosLocation.longitude,
          address: sosLocation.address,
          locationName: sosLocation.address,
          name: sosLocation.name,
          hopCount: 0,
          emergencyContacts: sosLocation.emergencyContacts,
          status: "ACTIVE" as const,
        };
        await savePendingSOS(payload);
        broadcastSOS(payload);

        const phoneNumber = profile?.emergencyContact.map((c) => c.phone) || [];
        console.log("Phone numbers:", phoneNumber);

        await sendEmergencySMS(phoneNumber, message);

        console.log("SOS saved offline + broadcasted");
        return;
      }

      await createSOSAlert({
        userId: sosLocation.userId,
        latitude: sosLocation.latitude,
        longitude: sosLocation.longitude,
        address: sosLocation.address,
        locationName: sosLocation.address,
        name: sosLocation.name,
        emergencyContacts: sosLocation.emergencyContacts,
        status: "ACTIVE",
      });

      await sendEmergencySMS(
        profile?.emergencyContact.map((c) => c.phone) || [],
        message,
      );

      console.log("Connected:", state.isConnected);
      console.log("SOS Location:", sosLocation);
      return;
    } catch (err) {
      console.error("Error saving SOS:", err);
    } finally {
      // TODO: Send SMS here
    }
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeaderCard user={user} />
        <LocationCard
          location={location || "Not Found"}
          loading={locationLoading}
        />
        <SosButton
          handleSOS={handleSOS}
          cancelSOS={cancelSOS}
          countDown={countDown}
        />
        <NearbyCard />
        <SMSCard />
        <QuickActionCard />
      </ScrollView>
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

  scrollContent: {
    paddingBottom: 20,
  },
});

{
  /* <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#f0f0f0",
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={() => router.push("/screens/devices")}
      >
        <Text>Bluetooth</Text>
      </TouchableOpacity> */
}
