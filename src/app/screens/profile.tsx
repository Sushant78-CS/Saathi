import InfoRow from "@/components/InfoRow";
import SettingRow from "@/components/SettingRow";
import { signOut } from "@/firebase/auth";
import useAuthStore from "@/store/authStore";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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
  const { user, profile } = useAuthStore();
  const router = useRouter();
  console.log("profile profile", profile);
  console.log("user profile", user);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerBack}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.displayName?.charAt(0) || "S"}
          </Text>
        </View>

        <Text style={styles.name}>{user?.displayName || "-"}</Text>

        <Text style={styles.email}>{user?.email || "-"}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Safety Profile Active</Text>
        </View>
      </View>

      <View style={styles.quickRow}>
        <TouchableOpacity
          onPress={() => router.push("/screens/emergencycontacts")}
          style={styles.quickCard}
        >
          <Feather name="phone-call" size={24} color="#ef4444" />
          <Text style={styles.quickLabel}>Emergency Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/screens/soshistory")}
          style={styles.quickCard}
        >
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
          value={profile?.phoneNumber || "-"}
        />

        <InfoRow
          icon="activity"
          label="Blood Group"
          value={profile?.bloodGroup || "-"}
        />

        <InfoRow
          icon="calendar"
          label="Age"
          value={profile?.age?.toString() || "-"}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        {profile?.emergencyContact?.map((contact, index) => (
          <View key={index}>
            <InfoRow
              icon="user"
              label="Contact Name"
              value={contact.name || "-"}
            />
          </View>
        ))}
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
    backgroundColor: "#F8FAFC",
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
    top: 28,
    zIndex: 10,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eaebee",
    justifyContent: "center",
    alignItems: "center",
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
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  name: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },

  email: {
    color: "#6B7280",
    marginTop: 4,
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
  },

  statusText: {
    color: "#15803D",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  quickLabel: {
    color: "#111827",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
  },

  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionTitle: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  logoutBtn: {
    backgroundColor: "#E53935",
    marginHorizontal: 16,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  version: {
    textAlign: "center",
    color: "#94A3B8",
    marginVertical: 20,
  },
});
