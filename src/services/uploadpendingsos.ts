import { clearPendingSOS, getPendingSOS } from "./offlinesos";
import createSOSAlert from "./sos";

export const uploadPendingSOS = async () => {
  const alerts = await getPendingSOS();

  if (alerts.length === 0) return;

  for (const alert of alerts) {
    await createSOSAlert(alert.latitude, alert.longitude, alert.address);
  }

  await clearPendingSOS();
};
