import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export interface SOSAlert {
  userId: string;
  latitude: number;
  longitude: number;
  locationName: string;
  status: "ACTIVE" | "RESOLVED";
}

const createSOSAlert = async (
  latitude: number,
  longitude: number,
  locationName: string,
) => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const docRef = await addDoc(collection(db, "sosAlerts"), {
    userId: auth.currentUser.uid,
    latitude,
    longitude,
    locationName,
    status: "ACTIVE",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export default createSOSAlert;
