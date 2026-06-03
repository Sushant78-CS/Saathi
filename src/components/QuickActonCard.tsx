import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function QuickActionCard() {
  return (
    <>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <ActionCard icon="phone-call" label="Contacts" />

        <ActionCard icon="share-2" label="Share" />

        <ActionCard icon="clock" label="History" />
      </View>
      <Text style={styles.sectionTitle}>Safety Status</Text>

      <View style={styles.statusCard}>
        <StatusItem label="Crash Detection" active />
        <StatusItem label="Location Tracking" active />
        <StatusItem label="Offline SOS" active />
      </View>
    </>
  );
}

function ActionCard({ icon, label }: { icon: any; label: string }) {
  return (
    <TouchableOpacity style={styles.actionCard}>
      <Feather name={icon} size={20} color="#1565C0" />
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}

function StatusItem({ label, active }: { label: string; active: boolean }) {
  return (
    <View style={styles.statusRow}>
      <Text style={styles.statusLabel}>{label}</Text>

      <Text
        style={{
          color: active ? "#16A34A" : "#DC2626",
          fontWeight: "600",
        }}
      >
        {active ? "ON" : "OFF"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
    marginTop: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#1565C0",
    fontWeight: "500",
  },
  statusCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500",
  },
});
