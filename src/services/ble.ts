import { Alert } from "react-native";
import AndroidOpenSettings from "react-native-android-open-settings";
import { BleManager } from "react-native-ble-plx";

console.log("AndroidOpenSettings", AndroidOpenSettings);

const bleManager = new BleManager();

export default bleManager;

export const scanBluetoothDevices = async () => {
  const state = await bleManager.state();
  console.log("BLE State:", state);
  if (state !== "PoweredOn") {
    Alert.alert(
      "BLE is not powered on",
      "Please enable Bluetooth and try again",
      [
        {
          text: "Open Settings",
          onPress: () => {
            AndroidOpenSettings.bluetoothSettings();
          },
        },
      ],
    );
    console.log("BLE is not powered on");
    return;
  }
  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Device found:", device?.name, device?.localName, device?.id);
  });

  setTimeout(() => {
    bleManager.stopDeviceScan();
    console.log("Scan stopped");
  }, 10000);
};
