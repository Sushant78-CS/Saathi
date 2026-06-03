import { router } from "expo-router";
import { MapPin, Radio, Shield, TriangleAlert } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Shield size={48} color="#E53935" />
        <Text style={styles.appName}>Safara</Text>
        <Text style={styles.tagline}>Stay Connected. Stay Safe.</Text>

        <Text style={styles.subtitle}>
          Emergency assistance for travelers, even in low-network areas.
        </Text>
      </View>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.sosCircle}>
          <Text style={styles.sosText}>SOS</Text>
        </View>

        <Text style={styles.heroTitle}>Emergency Response Network</Text>

        <Text style={styles.heroDescription}>
          Instant emergency alerts, offline relay support and intelligent rescue
          coordination.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.grid}>
        <FeatureCard
          icon={<TriangleAlert size={22} color="#E53935" />}
          title="One-Tap SOS"
          description="Instantly alert emergency services."
        />

        <FeatureCard
          icon={<Radio size={22} color="#1565C0" />}
          title="Offline Support"
          description="Works in remote locations."
        />

        <FeatureCard
          icon={<Shield size={22} color="#1565C0" />}
          title="Crash Detection"
          description="Automatically detects accidents."
        />

        <FeatureCard
          icon={<MapPin size={22} color="#E53935" />}
          title="Live Location"
          description="Share location with contacts."
        />
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/sign-up")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.iconContainer}>{icon}</View>

      <Text style={styles.featureTitle}>{title}</Text>

      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  logoContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 24,
  },

  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#E53935",
    marginTop: 8,
  },

  tagline: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 5,
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  heroCard: {
    margin: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },

  sosCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  sosText: {
    color: "white",
    fontWeight: "700",
    fontSize: 22,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  heroDescription: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 5,
    lineHeight: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  featureCard: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  iconContainer: {
    marginBottom: 12,
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  featureDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
    lineHeight: 18,
  },

  button: {
    backgroundColor: "#E53935",
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  signInText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 13,
    color: "#1565C0",
    fontWeight: "600",
  },
});
