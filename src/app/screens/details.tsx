import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Profile, saveProfile } from "../../firebase/profile";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Profile>({
    phoneNumber: "",
    age: "",
    bloodGroup: "",
    emergencyName: "",
    relationship: "",
    emergencyPhone: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveProfile(form);
      router.replace("/screens/home");
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Complete Your Safety Profile</Text>

        <Text style={styles.subtitle}>
          This information helps emergency responders assist you faster during
          emergencies.
        </Text>

        <SectionTitle title="Personal Information" />

        <Input
          label="Phone Number *"
          value={form.phoneNumber}
          keyboardType="phone-pad"
          onChange={(text: string) => updateField("phoneNumber", text)}
        />

        <Input
          label="Age"
          value={form.age}
          keyboardType="numeric"
          onChange={(text: string) => updateField("age", text)}
        />

        <Input
          label="Blood Group"
          value={form.bloodGroup}
          onChange={(text: string) => updateField("bloodGroup", text)}
        />

        <SectionTitle title="Emergency Contact" />

        <Input
          label="Contact Name *"
          value={form.emergencyName}
          onChange={(text: string) => updateField("emergencyName", text)}
        />

        <Input
          label="Relationship *"
          value={form.relationship}
          onChange={(text: string) => updateField("relationship", text)}
        />

        <Input
          label="Emergency Number *"
          value={form.emergencyPhone}
          keyboardType="phone-pad"
          onChange={(text: string) => updateField("emergencyPhone", text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Save Profile"}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.section}>{title}</Text>;
}

function Input({
  label,
  value,
  onChange,
  keyboardType,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: TextInputProps["keyboardType"];
  multiline?: boolean;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, multiline && { height: 90 }]}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 20,
  },

  section: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    marginTop: 10,
    color: "#111827",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#F9FAFB",
  },

  button: {
    backgroundColor: "#E53935",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
