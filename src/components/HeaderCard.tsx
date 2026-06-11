import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/constants/responsive";
import { router } from "expo-router";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderCard({ user }: { user: FirebaseUser }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Welcome Back</Text>
        <Text style={styles.name}>{user?.displayName || "User"}</Text>
      </View>

      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => router.push("/screens/profile")}
      >
        <User size={20} color="#111827" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  greeting: {
    color: "#6B7280",
    fontSize: FONT_SIZE.small,
  },

  name: {
    fontSize: FONT_SIZE.heading,
    fontWeight: "700",
    color: "#111827",
    marginTop: SPACING.xs / 2,
  },

  profileBtn: {
    width: ICON_SIZE.xl + SPACING.xs,
    height: ICON_SIZE.xl + SPACING.xs,
    borderRadius: RADIUS.full,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
});
