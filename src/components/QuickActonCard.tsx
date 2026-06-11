import { CARD, FONT_SIZE, SPACING } from "@/constants/responsive";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuickActionCard() {
  const router = useRouter();
  return (
    <>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <ActionCard
          onPress={() => router.push("/screens/emergencycontacts")}
          icon="phone-call"
          label="Contacts"
        />

        <ActionCard onPress={() => {}} icon="share-2" label="Share" />

        <ActionCard
          onPress={() => router.push("/screens/soshistory")}
          icon="clock"
          label="History"
        />
      </View>
    </>
  );
}

export function ActionCard({
  onPress,
  icon,
  label,
}: {
  onPress: () => void;
  icon: any;
  label: string;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionCard}>
      <Feather name={icon} size={20} color="#1565C0" />
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: FONT_SIZE.subtitle,
    fontWeight: "700",
    color: "#111827",
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },

  actionsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },

  actionCard: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: CARD.borderRadius,
    paddingVertical: SPACING.md,

    justifyContent: "center",
    alignItems: "center",
  },

  actionText: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.small,
    color: "#1565C0",
    fontWeight: "600",
  },
});
