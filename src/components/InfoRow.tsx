import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Feather name={icon} size={16} color="#ef4444" />
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    color: "#E2E8F0",
    fontSize: 13,
  },

  value: {
    color: "#94A3B8",
    fontSize: 13,
  },
});
