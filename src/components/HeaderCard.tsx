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
  },

  greeting: {
    color: "#6B7280",
    fontSize: 13,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },

  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
});
