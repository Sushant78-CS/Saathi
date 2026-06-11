import { clearPendingSOS, getPendingSOS } from "./offlinesos";
import createSOSAlert from "./sos";

export const uploadPendingSOS = async () => {
  const alerts = await getPendingSOS();

  if (alerts.length === 0) return;

  for (const alert of alerts) {
    await createSOSAlert({
      userId: alert.userId,
      latitude: alert.latitude,
      longitude: alert.longitude,
      address: alert.address,
      locationName: alert.address,
      name: alert.name,
      emergencyContacts: alert.emergencyContacts,
      status: "ACTIVE",
    });
  }

  await clearPendingSOS();
};
