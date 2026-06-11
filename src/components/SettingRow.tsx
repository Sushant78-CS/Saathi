import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function SettingRow({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.settingText}>{title}</Text>

      <Feather name="chevron-right" size={18} color="#000" />
    </TouchableOpacity>
  );
}

export default SettingRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingText: {
    color: "#000",
    fontSize: 13,
  },
});
