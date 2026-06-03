import { InfoRow } from "@/components/InfoRow";
import SettingRow from "@/components/SettingRow";
import { signOut } from "@/firebase/auth";
import { getProfile, Profile } from "@/firebase/profile";
import authStore from "@/store/authStore";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const AVATAR_SIZE = width * 0.22;

export default function ProfileScreen() {
  const { user } = authStore();
  const router = useRouter();

  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile();
      setProfileData(data);
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerBack}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.displayName?.charAt(0) || "S"}
          </Text>
        </View>

        <Text style={styles.name}>{user?.displayName || "-"}</Text>

        <Text style={styles.email}>{user?.email || "sushant@gmail.com"}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Safety Profile Active</Text>
        </View>
      </View>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickCard}>
          <Feather name="phone-call" size={24} color="#ef4444" />
          <Text style={styles.quickLabel}>Emergency Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <MaterialIcons name="history" size={24} color="#ef4444" />
          <Text style={styles.quickLabel}>SOS History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <InfoRow
          icon="user"
          label="Full Name"
          value={user?.displayName || "-"}
        />

        <InfoRow icon="mail" label="Email" value={user?.email || "-"} />

        <InfoRow
          icon="phone"
          label="Phone Number"
          value={profileData?.phoneNumber || "-"}
        />

        <InfoRow
          icon="activity"
          label="Blood Group"
          value={profileData?.bloodGroup || "-"}
        />

        <InfoRow
          icon="calendar"
          label="Age"
          value={profileData?.age?.toString() || "-"}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>

        <InfoRow
          icon="user"
          label="Contact Name"
          value={profileData?.emergencyName || "-"}
        />

        <InfoRow
          icon="heart"
          label="Relationship"
          value={profileData?.relationship || "-"}
        />

        <InfoRow
          icon="phone"
          label="Emergency Number"
          value={profileData?.emergencyPhone || "-"}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <SettingRow title="Notification Preferences" />
        <SettingRow title="Location Permissions" />
        <SettingRow title="Privacy & Security" />
        <SettingRow title="Terms & Conditions" />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <MaterialIcons name="logout" size={18} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Safara v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  header: {
    alignItems: "center",
    paddingTop: 42,
    paddingBottom: 25,
    position: "relative",
  },

  headerBack: {
    position: "absolute",
    left: 24,
    top: 20,
    zIndex: 10,
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },

  email: {
    color: "#94A3B8",
    marginTop: 4,
  },

  statusBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },

  quickCard: {
    width: "42%",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
  },

  quickLabel: {
    color: "#fff",
    marginTop: 8,
    fontSize: 12,
  },

  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    paddingVertical: 10,
  },

  sectionTitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  logoutBtn: {
    backgroundColor: "#7F1D1D",
    marginHorizontal: 16,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },

  version: {
    textAlign: "center",
    color: "#64748B",
    marginVertical: 20,
  },
});
