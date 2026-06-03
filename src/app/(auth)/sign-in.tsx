import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signIn } from "../../firebase/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await signIn(email, password);
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error handling sign in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={[styles.mainContainer]}>
      <View style={[styles.container]}>
        <View style={[styles.content]}>
          <Text style={styles.title}>Welcome, Sign In</Text>
        </View>
        <View style={[styles.inputContainer]}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText]}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottomSection]}>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  content: {
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  bottomSection: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 16,
    color: "#4e5152ff",
  },
  signUpText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 5,
  },
  signUpLink: {
    color: "#007185",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "500",
  },
  createAccountButton: {
    marginTop: 18,
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },

  createAccountText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },
});
