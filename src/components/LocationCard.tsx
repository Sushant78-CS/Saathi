import { MapPin } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export function LocationCard({ location }: { location: string }) {
  return (
    <View style={styles.locationCard}>
      <View style={styles.locationRow}>
        <MapPin size={18} color="#1565C0" />
        <Text style={styles.locationTitle}>Current Location</Text>
      </View>
      <Text style={styles.locationText}>{location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  locationCard: {
    marginTop: 24,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    marginLeft: 8,
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  safeStatus: {
    marginTop: 8,
    fontSize: 13,
  },
});
