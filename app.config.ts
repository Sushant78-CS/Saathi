import { ConfigContext, ExpoConfig } from "expo/config";

const expoConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: "Rakshak",
  slug: "rakshak",

  plugins: [...(config.plugins || [])],

  extra: {
    ...config.extra,

    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId:
      process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,

    eas: {
      projectId: "42f5ea4c-319b-4131-b44b-607a428ef4c7",
    },
  },
});

export default expoConfig;
