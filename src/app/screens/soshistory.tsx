import { subscribeSOSHistory } from "@/services/sos";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SOSHistory = () => {
  const router = useRouter();

  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeSOSHistory(setAlerts);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.title}>SOS History</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{alerts.length}</Text>
          <Text style={styles.statLabel}>Total SOS</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {alerts.filter((alert) => alert.status === "ACTIVE").length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {alerts.map((alert) => (
          <TouchableOpacity key={alert.id} style={styles.historyCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          alert.status === "ACTIVE" ? "#10B981" : "#EF4444",
                      },
                    ]}
                  />
                  <Text style={styles.statusText}>{alert.status}</Text>
                </View>

                <Text style={styles.location}>{alert.locationName}</Text>
                <Text style={styles.time}>
                  {alert.createdAt?.toDate().toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SOSHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },

  header: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    height: 40,
  },

  backButton: {
    position: "absolute",
    left: 0,
    width: 46,
    height: 46,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  historyCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  location: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  time: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },

  statsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E53935",
  },

  statLabel: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
});
