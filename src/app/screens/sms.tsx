import {
  BUTTON,
  CARD,
  FONT_SIZE,
  ICON_SIZE,
  RADIUS,
  SPACING,
} from "@/constants/responsive";
import { getCurrentLocation } from "@/services/location";
import { sendEmergencySMS } from "@/services/sms";
import { SOSAlert } from "@/services/sos";
import useAuthStore from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SMSPage() {
  const [phone, setPhone] = useState("");
  const [sosLocation, setSosLocation] = useState<SOSAlert | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const { user, profile } = useAuthStore();

  useEffect(() => {
    const loadLocation = async () => {
      try {
        setLocationLoading(true);

        const loc = await getCurrentLocation();
        setSosLocation({
          userId: user?.uid || "",
          address: loc?.address || "Unknown",
          latitude: loc?.latitude || 0,
          longitude: loc?.longitude || 0,
          locationName: loc?.address || "Unknown",
          name: user?.displayName || "",
          emergencyContacts: profile?.emergencyContact || [],
          status: "ACTIVE",
        });
      } catch (err) {
        console.error("Error loading location:", err);
        setSosLocation(null);
      } finally {
        setLocationLoading(false);
      }
    };
    loadLocation();
  }, []);

  const handleSendSMS = async () => {
    try {
      const message = `
🚨 EMERGENCY SOS

Name: ${sosLocation?.name}

📍 Address:
${sosLocation?.address}

🗺️ Live Location:
https://maps.google.com/?q=${sosLocation?.latitude},${sosLocation?.longitude}

⏰ Time:
${new Date().toLocaleString()}

This alert was sent from Safara.
Please contact or assist immediately.
`;
      await sendEmergencySMS([phone], message);

      Alert.alert("Success", "SMS composer opened.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send SMS.");
    }
  };
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={ICON_SIZE.md} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Emergency SMS</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Phone Number</Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholderTextColor="#9CA3AF"
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendSMS}>
          <Text style={styles.buttonText}>Send Emergency SMS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: SPACING.md,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: SPACING.lg,
    height: BUTTON.height,
  },

  backButton: {
    position: "absolute",
    left: 0,

    width: ICON_SIZE.xl,
    height: ICON_SIZE.xl,

    borderRadius: RADIUS.full,

    backgroundColor: "#F3F4F6",

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: FONT_SIZE.title,
    fontWeight: "700",
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: CARD.borderRadius,
    padding: CARD.padding,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  label: {
    fontSize: FONT_SIZE.body,
    fontWeight: "600",
    color: "#374151",
    marginBottom: SPACING.sm,
  },

  input: {
    height: BUTTON.height,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: RADIUS.md,

    paddingHorizontal: SPACING.md,

    fontSize: FONT_SIZE.body,
    color: "#111827",

    backgroundColor: "#F9FAFB",

    marginBottom: SPACING.md,
  },

  button: {
    height: BUTTON.height,

    backgroundColor: "#E53935",

    borderRadius: BUTTON.borderRadius,

    justifyContent: "center",
    alignItems: "center",

    marginTop: SPACING.xs,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZE.subtitle,
    fontWeight: "700",
  },

  infoCard: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",

    borderRadius: RADIUS.md,

    padding: SPACING.md,

    marginBottom: SPACING.md,
  },

  infoTitle: {
    fontSize: FONT_SIZE.body,
    fontWeight: "700",
    color: "#B91C1C",
    marginBottom: SPACING.xs,
  },

  infoText: {
    fontSize: FONT_SIZE.small,
    color: "#7F1D1D",
    lineHeight: FONT_SIZE.small * 1.5,
  },
});
